import { SketchProps, P5CanvasInstance } from "@p5-wrapper/react";
import Settings from "./interfaces/settings";

let insidePolygon = require('point-in-polygon');

type MySketchProps = SketchProps & {
  settings: Settings
};

// turns the perimeter of a polygon, 
export default class PolygonBounds {

  p5: P5CanvasInstance<SketchProps>;
  polygon: number[][];
  constructor(p5: P5CanvasInstance<MySketchProps>, polygon: number[][]) {
    this.p5 = p5;
    this.polygon = polygon;
  }

  drawBounds() {
    this.p5.beginShape();
      for(let i = 0; i < this.polygon.length; i++) {
        this.p5.vertex(this.polygon[i][0], this.polygon[i][1]);
      }
      this.p5.vertex(this.polygon[0][0], this.polygon[0][1]);
    this.p5.endShape();
  }

  contains(point) {
    return insidePolygon(point, this.polygon);
  }
}