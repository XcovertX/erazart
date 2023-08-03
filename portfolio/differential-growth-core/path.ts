import Node from './node';
import PolygonBounds from './polygon-bounds'
import { P5CanvasInstance, SketchProps } from '@p5-wrapper/react';
import PositionType from '../interfaces/position';
var knn = require('rbush-knn');
import { getID } from './demo-1/dif-gro-example-1';
import Settings from './interfaces/settings';

type MySketchProps = SketchProps & {
  settings: Settings;
};

/** Manages a set of Nodes in a continuous, ordered data structure (an Array). */
export default class Path {
  p5: P5CanvasInstance<MySketchProps>;
  nodes: Array<Node>;
  settings: Settings;
  polygonBounds: PolygonBounds;
  lastNodeInjection: number;
  constructor(p5: P5CanvasInstance<MySketchProps>, 
              nodes: Array<Node>,
              polygonBounds: PolygonBounds,
              settings: Settings) {
                this.p5 = p5;
                this.nodes = nodes;
                this.settings = settings;
                this.polygonBounds = polygonBounds;
                this.lastNodeInjection = 0;
              }

  // iterates over every node in this path
  iterate(tree) {
    for (let i = 0; i < this.nodes.length; i++) {
      if(this.settings.brownianMode && !this.nodes[i].isFixed) {
        this.applyBrownianMotion(i);
      }
      this.applyAttraction(i);
      this.applyRepulsion(i, tree);
      this.applyAlignment(i);
      this.applyBounds(i);
      this.nodes[i].iterateNode();
    }
    this.splitEdges();
    this.pruneNodes();

    if (this.p5.millis() - this.lastNodeInjection >= this.settings.nodeInjectionRate) {
      this.injectNode();
      this.lastNodeInjection = this.p5.millis();
    }
  }

  // brownian motion gives each node an organic, vibration looking effect
  applyBrownianMotion(index: number) {
    this.nodes[index].x += this.p5.random(-this.settings.brownianScalar/2, this.settings.brownianScalar/2);
    this.nodes[index].y += this.p5.random(-this.settings.brownianScalar/2, this.settings.brownianScalar/2);
  }

  // Pulls neighboring nodes together
  applyAttraction(index: number) {
    let distance: number;
    let leastMinDistance: number;
    let connectedNodes = this.getConnectedNodes(index);
    let node = this.nodes[index];
    let nextNode = connectedNodes.nextNode;
    let previousNode = connectedNodes.previousNode;

    // Move towards next node, if there is one
    if (nextNode != undefined && 
        nextNode instanceof Node && 
        !node.isFixed
       ) {
      distance = node.distance(nextNode);
      leastMinDistance = Math.min(node.settings.minDistance, nextNode.settings.minDistance);

      if (distance > leastMinDistance) {
        this.nodes[index].nextPosition.x = this.p5.lerp(node.nextPosition.x, nextNode.x, node.settings.attractionScalar);
        this.nodes[index].nextPosition.y = this.p5.lerp(node.nextPosition.y, nextNode.y, node.settings.attractionScalar);
      }
    }

    // Move towards previous node, if there is one
    if (
      previousNode != undefined &&
      previousNode instanceof Node && 
      !node.isFixed
    ) {
      distance = node.distance(previousNode);
      leastMinDistance = Math.min(node.settings.minDistance, previousNode.settings.minDistance);

      if (distance > leastMinDistance) {
        this.nodes[index].nextPosition.x = this.p5.lerp(node.nextPosition.x, previousNode.x, node.settings.attractionScalar);
        this.nodes[index].nextPosition.y = this.p5.lerp(node.nextPosition.y, previousNode.y, node.settings.attractionScalar);
      }
    }
  }

  // Repulses all nodes within a given radius away by a given rupulsive scalar 
  applyRepulsion(index: number, tree) {

    // k-nearest-neighbor search
    const n = this.nodes[index];
    var neighbors = knn(tree, n.x, n.y, undefined, undefined, n.settings.repulsionRadius);

    // replulse
    for(let node of neighbors) {
      this.nodes[index].nextPosition.x = this.p5.lerp(n.x, node.x, -n.settings.repulsionScalar);
      this.nodes[index].nextPosition.y = this.p5.lerp(n.y, node.y, -n.settings.repulsionScalar);
    }
  }

  // Minimizes curvature by applying a given alignment scalar to every neighboring node in a path
  applyAlignment(index: number) {
    let connectedNodes = this.getConnectedNodes(index);
    let node = this.nodes[index];
    let nextNode = connectedNodes.nextNode;
    let previousNode = connectedNodes.previousNode;

    if (
      previousNode != undefined && previousNode instanceof Node &&
      nextNode     != undefined && nextNode     instanceof Node &&
      !this.nodes[index].isFixed
    ) {
      let midpoint = this.getMidpointNode(previousNode, nextNode);
      this.nodes[index].nextPosition.x = this.p5.lerp(node.nextPosition.x, midpoint.x, node.settings.alignmentScalar);
      this.nodes[index].nextPosition.y = this.p5.lerp(node.nextPosition.y, midpoint.y, node.settings.alignmentScalar);
    }
  }

  // Finds every edge that is longer than the given maxDistance and injects a node inbetween them
  splitEdges() {
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      let connectedNodes = this.getConnectedNodes(i);
      let previousNode = connectedNodes.previousNode;

      if (
        previousNode != undefined &&
        previousNode instanceof Node &&
        node.distance(previousNode) >= this.settings.maxDistance) {

        let midpointNode = this.getMidpointNode(node, previousNode);
        
        if(i == 0) {
          this.nodes.splice(this.nodes.length, 0, midpointNode);
        } else {
          this.nodes.splice(i, 0, midpointNode);
        }
      }
    }
  }

  // removes node that are too close to neigboring nodes
  pruneNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
    
      let connectedNodes = this.getConnectedNodes(i);
      let previousNode = connectedNodes.previousNode;

      if(
        previousNode != undefined && 
        previousNode instanceof Node &&
        node.distance(previousNode) < this.settings.minDistance) 
      {
        if(i == 0) {
          if(!this.nodes[this.nodes.length - 1].isFixed) {
            this.nodes.splice(this.nodes.length - 1, 1);
          }
        } else {
          if(!this.nodes[i - 1].isFixed) {
            this.nodes.splice(i - 1, 1);
          }
        }
      }
    }
  }

  // selects a method for injecting new nodes
  injectNode() {
    let index = this.p5.random(1, this.nodes.length);
    let connectedNodes = this.getConnectedNodes(index);
    let node = this.nodes[index];
    let nextNode = connectedNodes.nextNode;
    let previousNode = connectedNodes.previousNode;

    if (
      previousNode != undefined && previousNode instanceof Node &&
      nextNode     != undefined && nextNode     instanceof Node &&
      node.distance(previousNode) > node.settings.minDistance
    ) {
      let midpointNode = this.getMidpointNode(node, previousNode);
      this.nodes.splice(index, 0, midpointNode);
    }
  }

  // applies polygon boundary to this path
  applyBounds(index: number) {
    let node = this.nodes[index];
    if(this.polygonBounds != undefined && 
       this.polygonBounds instanceof PolygonBounds &&
      !this.polygonBounds.contains([node.x, node.y])) {
        node.isFixed = true;
    }
  }

  // returns neighboring nodes
  getConnectedNodes(index: number) {
    let previousNode: Node, nextNode: Node;

    // Find previous node, if there is one
    if(index == 0 && this.settings.isClosed) {
      previousNode = this.nodes[this.nodes.length - 1];
    } else if(index >= 1) {
      previousNode = this.nodes[index - 1];
    }

    // Find next node, if there is one
    if(index == this.nodes.length - 1 && this.settings.isClosed) {
      nextNode = this.nodes[0];
    } else if(index <= this.nodes.length - 1) {
      nextNode = this.nodes[index + 1];
    }

    return {
      previousNode,
      nextNode
    };
  }

  // returns new node halfway between two given nodes
  getMidpointNode(node1: Node, node2: Node, fixed = false) {
    var p1: PositionType = {
        x: (node1.x + node2.x) / 2,
        y: (node1.y + node2.y) / 2
    }
    
    return new Node(
      getID(),
      this.p5,
      p1,
      this.settings,
      false
    );
  }

  // calls all applicable draw methods
  draw() {
    if(this.settings.showBoundsMode && 
       this.polygonBounds != undefined && 
       this.polygonBounds instanceof PolygonBounds) 
    {
      this.drawBounds();
    }
    if(this.settings.fillMode && this.settings.isClosed) {
      this.p5.fill(this.settings.fillColor.h, this.settings.fillColor.s, this.settings.fillColor.b);
    } else {
      this.p5.noFill();
    }
    this.p5.stroke(this.settings.fillColor.h, this.settings.fillColor.s, this.settings.fillColor.b);
    this.drawCurrentEdges();
    if(this.settings.drawNodesMode) {
      this.drawCurrentNodes();
    }
  }

  // draw edges
  drawCurrentEdges() {
    this.drawEdges(this.nodes);
  }

  // draws edges
  drawEdges(nodes: Array<Node>) {
    if(!this.settings.debugMode) {
      this.p5.beginShape();
    }
    for (let i = 0; i < this.nodes.length; i++) {
      if(!this.settings.debugMode) {
        this.p5.vertex(this.nodes[i].x, this.nodes[i].y);
      } else {
        if(i > 0) {
          if(!this.settings.traceMode) {
            this.p5.stroke(this.p5.map(i, 0, nodes.length-1, 0, 360, true), 360, 360, 360);
          } else {
            this.p5.stroke(this.p5.map(i, 0, nodes.length-1, 0, 360, true), 360, 360, 2);
          }

          this.p5.line(nodes[i-1].x, nodes[i-1].y, nodes[i].x, nodes[i].y);

        }
      }
    }

    // For closed paths, connect the last and first nodes
    if(this.settings.isClosed) {
      if(!this.settings.debugMode) {
        this.p5.vertex(nodes[0].x, nodes[0].y);
      } else {
        this.p5.line(nodes[nodes.length - 1].x, nodes[nodes.length - 1].y, nodes[0].x, nodes[0].y);
      }
    }

    // Stop capturing vertices
    if(!this.settings.debugMode) {
      this.p5.endShape();
    }
  }

  // Draws each node
  drawCurrentNodes() {
    this.p5.noStroke();
    this.p5.fill(360);

    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if(this.settings.debugMode) {
        this.p5.fill( this.p5.map(i, 0, this.nodes.length-1, 0, 255, true), 255, 255, 255 );
      }
      node.drawNode();
    }
  }

  addNode(node: Node) {
    this.nodes.push(node);
  }

  // Draw polygon bounds
  drawBounds() {
    this.p5.stroke(360);
    this.p5.noFill();
    this.polygonBounds.drawBounds();
  }

  moveTo(xOffset: number, yOffset: number) {
    for(let node of this.nodes) {
      node.x += xOffset;
      node.y += yOffset;
    }
  }

  // to scale nodes for canvas scaling
  scale(factor: number) {
    for(let node of this.nodes) {
      node.x *= factor;
      node.y *= factor;
    }
  }

  toArray() {
    let polygon = [];
    for(let node of this.nodes) {
      polygon.push([node.x, node.y]);
    }
    return polygon;
  }
}