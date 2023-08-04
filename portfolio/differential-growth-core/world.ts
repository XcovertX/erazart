import { SketchProps, P5CanvasInstance } from "@p5-wrapper/react";
import Path from "./path";
import CustomRBush from './CustomRBush';
import Settings from "./interfaces/settings";

type Props = SketchProps & {};

export default class World {
  paths: Array<Path>;
  settings: Settings;
  p5: P5CanvasInstance<Props>;
  currentPath: number;

  tree;
  constructor(settings: Settings) {
    this.paths = new Array<Path>;
    this.settings = settings;
    this.tree = new CustomRBush(9);
    this.buildTree();
    this.currentPath = 0;
  }

  // iterates over every path
  iterate() {
    this.prunePaths();
    this.buildTree();

    if (this.paths != undefined &&
        this.paths instanceof Array && 
        this.paths.length > 0 && 
       !this.settings.paused) 
    {
      if(this.settings.indiPathMode) {
        const path = this.paths[this.currentPath];
        path.iterate(this.tree);
        if(path.iterationCount == path.settings.iterationCount){
          this.currentPath++;
        }
      } else {
        for (let i = 0; i < this.paths.length; i++) {
          const path = this.paths[i];
          path.iterate(this.tree);
        }
      }
    }
  }

  draw() {
    if (!this.settings.traceMode) {
      this.drawBackground();
    }

    for (let path of this.paths) {
      path.draw();
    }
  }

  // draws the background
  drawBackground() {
      this.p5.background(this.p5.color(this.settings.backgroundColor.h, 
                                       this.settings.backgroundColor.s, 
                                       this.settings.backgroundColor.b, 
                                       this.settings.backgroundColor.a));
  }

  // Builds an R-tree spatial index with all Nodes of all Paths
  buildTree() {
    this.tree.clear();
    for(let path of this.paths) {
      this.tree.load(path.nodes);
    }
  }

  // adds path to world
  addPath(path: Path) {
    this.paths.push(path);
  }

  // adds another path to the world
  addPaths(paths: Array<Path>) {
    for(let path of paths) {
      this.addPath(path);
    }
  }

  // remove all paths that are too short
  prunePaths() {
    for(let i = 0; i < this.paths.length; i++) {
      if(this.paths[i].nodes.length <= 1) {
        this.paths.splice(i, 1);
      }
    }
  }

  // clears all of the paths from this world
  clearPaths() {
    this.paths = [];
  }
}
