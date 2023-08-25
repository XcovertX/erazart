import React, { useEffect, useState, useRef } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

type MySketchProps = SketchProps & {
    hover: boolean;
    toTop: boolean;
    arrowBounce: number;
    arrowX: number;
    arrowY: number;
};

function buttonSketch(p5: P5CanvasInstance<MySketchProps>) {

    var state = {
        hover: false,
        toTop: true,
        arrowX: 50,
        arrowY: 70,
        arrowBounce: 0
    }

    var canvas, cartLayer, button, rotation: number;

    p5.windowResized = () => {
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
    }

    function changeBG() {
        let val = p5.random(360);
        p5.background(val);
    }

    p5.setup = () => {
        canvas = p5.createCanvas(100, 140, p5.P2D);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
        p5.background(0, 0, 0, 0);
        p5.colorMode(p5.HSB, 360)
        p5.ellipseMode(p5.RADIUS);
        
        cartLayer = p5.createGraphics(window.innerWidth, window.innerHeight)
        cartLayer.position(0,0);
        cartLayer.colorMode(p5.HSB, 360)
        cartLayer.strokeWeight(3);
        cartLayer.ellipseMode(p5.RADIUS);

        p5.updateWithProps = props => {
            state = Object.assign(state, props);
        }
    }

    function drawAll() {

        return () => {
            p5.clear(0, 0, 0, 0);
            if(p5.frameCount % 1 == 0) {
                state.arrowBounce = state.arrowBounce + Math.PI/45;
            }
            state.arrowY = state.arrowY + p5.sin(state.arrowBounce)/5;

            p5.push();
            p5.strokeWeight(1);
            p5.noFill();

            if (state.hover){
                p5.stroke(p5.color(310,  360, 360));
            } else {
                p5.stroke(p5.color(160,  360, 360));
            }

            let offsetX = p5.map(p5.mouseX, 0, p5.width, 1, -1);
            let offsetY = p5.map(p5.mouseY, 0, p5.height, 1, -1);
            p5.drawingContext.shadowColor = p5.color(0, 360, 360);
            p5.drawingContext.shadowOffsetX = offsetX
            p5.drawingContext.shadowOffsetY = offsetY;

            if(state.toTop) {
                p5.beginShape();
                p5.vertex(state.arrowX, state.arrowY-50);
                p5.vertex(state.arrowX-15, state.arrowY-25);
                p5.vertex(state.arrowX+15, state.arrowY-25);
                p5.vertex(state.arrowX, state.arrowY-50);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY-16);
                p5.vertex(state.arrowX-10, state.arrowY-22);
                p5.vertex(state.arrowX+10, state.arrowY-22);
                p5.vertex(state.arrowX+10, state.arrowY-16);
                p5.vertex(state.arrowX-10, state.arrowY-16);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY-13);
                p5.vertex(state.arrowX-10, state.arrowY-9);
                p5.vertex(state.arrowX+10, state.arrowY-9);
                p5.vertex(state.arrowX+10, state.arrowY-13);
                p5.vertex(state.arrowX-10, state.arrowY-13);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY-6);
                p5.vertex(state.arrowX-10, state.arrowY-3);
                p5.vertex(state.arrowX+10, state.arrowY-3);
                p5.vertex(state.arrowX+10, state.arrowY-6);
                p5.vertex(state.arrowX-10, state.arrowY-6);
                p5.endShape();

            } else {

                p5.beginShape();
                p5.vertex(state.arrowX, state.arrowY+50);
                p5.vertex(state.arrowX-15, state.arrowY+25);
                p5.vertex(state.arrowX+15, state.arrowY+25);
                p5.vertex(state.arrowX, state.arrowY+50);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY+16);
                p5.vertex(state.arrowX-10, state.arrowY+22);
                p5.vertex(state.arrowX+10, state.arrowY+22);
                p5.vertex(state.arrowX+10, state.arrowY+16);
                p5.vertex(state.arrowX-10, state.arrowY+16);
                p5.endShape();
    
                
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY+13);
                p5.vertex(state.arrowX-10, state.arrowY+9);
                p5.vertex(state.arrowX+10, state.arrowY+9);
                p5.vertex(state.arrowX+10, state.arrowY+13);
                p5.vertex(state.arrowX-10, state.arrowY+13);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY+6);
                p5.vertex(state.arrowX-10, state.arrowY+3);
                p5.vertex(state.arrowX+10, state.arrowY+3);
                p5.vertex(state.arrowX+10, state.arrowY+6);
                p5.vertex(state.arrowX-10, state.arrowY+6);
                p5.endShape();
            }
  
            p5.pop();
        }
    }

    p5.draw = drawAll();
};



export default function ScrollButton(props: {top: number, direction: boolean, scrollTo}) {
    const [hover,   setHover] =  useState(false);
    const [sectionTop, setSectionTop] = useState(props.top);
    const onMouseEnter  = () =>   setHover(true);
    const onMouseLeave  = () =>  setHover(false);

    useEffect(() => setSectionTop(props.top), [sectionTop]);

    return (
        <button className="flex items-center relative justify-center"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => props.scrollTo(sectionTop)}>
            <NextReactP5Wrapper sketch={buttonSketch} hover={hover} toTop={props.direction}/>
        </button>
        
    )
}