import Vec2 from "vec2";
import PositionType from "../interfaces/position"
import { SketchProps, P5CanvasInstance } from "@p5-wrapper/react";
import Settings from "./interfaces/settings";

export default class Node extends Vec2  {
  id: number;
  nextPosition: PositionType;
  settings: Settings;
  p5: P5CanvasInstance<SketchProps>;
  isFixed: boolean;
  constructor(id:number, p5: P5CanvasInstance<SketchProps>, position: PositionType, settings: Settings, fixed: boolean) {
    super(position.x, position.y)
    this.id = id;
    this.nextPosition = new Vec2(position.x, position.y);
    this.settings = settings;
    this.p5 = p5;
    this.isFixed = fixed;
  }

  // Moves Node by a single step
  iterateNode() {
    if(!this.isFixed) {
        this.x = this.p5.lerp(this.x, this.nextPosition.x, this.settings.maxVelocity);
        this.y = this.p5.lerp(this.y, this.nextPosition.y, this.settings.maxVelocity);
    }
  }

  drawNode() {
    let r: number;
    
    if(this.isFixed) {
      this.p5.fill(this.settings.fixedColor.h, this.settings.fixedColor.s, this.settings.fixedColor.b)
      r = this.settings.fixedNodeRadius; 
    } else {
      this.p5.fill(this.settings.movingColor.h, this.settings.movingColor.s, this.settings.movingColor.b)
      r = this.settings.movingNodeRadius;
    }
    this.p5.ellipse(this.x, this.y, r, r);
  }
}