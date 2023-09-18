import React, { useContext, useEffect, useState } from "react";
import { SketchProps, P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

type MySketchProps = SketchProps & {
    hover: boolean;
    toTop: boolean;
    arrowBounce: number;
    arrowX: number;
    arrowY: number;  
    color: string;
};

type Props = {
    top: number;
    direction: boolean;
    scrollTo: any;
    theme: string;
    color: string;
}

function buttonSketch(p5: P5CanvasInstance<MySketchProps>) {

    var state = {
        hover: false,
        toTop: true,
        arrowX: 50,
        arrowY: 70,
        arrowBounce: 0,
        theme: "dark",
        color: ''
    }

    var canvas, cartLayer, highlightColor, fillColor;

    p5.windowResized = () => {
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
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

            state.arrowBounce = state.arrowBounce + Math.PI/45;
            state.arrowY = state.arrowY + p5.sin(state.arrowBounce)/5;
         
            p5.push();

            if(state.toTop) {
                if(state.theme == "dark") {
                    fillColor         = p5.color('#c026d3');
                    highlightColor    = p5.color('#10b981');
                } else {
                    highlightColor    = p5.color('#10b981');
                    fillColor         = p5.color('#f59e0b');
                }
            } else {
                if(state.theme == "dark") {
                    fillColor         = p5.color('#c026d3');
                    highlightColor    = p5.color('#10b981');
                } else {
                    highlightColor    = p5.color('#10b981');
                    fillColor         = p5.color('#f59e0b');
                }
            }

            if (state.hover){
                p5.fill(highlightColor);
                if(state.theme == "dark") {
                    p5.noStroke();
                    p5.drawingContext.shadowColor = p5.color(highlightColor);
                    p5.drawingContext.shadowBlur = 5;
                    
                } else {
                    p5.noStroke();
                }

            } else {
                p5.noFill();
                p5.strokeWeight(3);
                if(state.theme == "dark") {
                    p5.stroke(fillColor);
                    p5.drawingContext.shadowColor = highlightColor;
                } else {
                    p5.noStroke()
                    p5.fill(fillColor);
                }      
            }

            if(state.toTop) {
                p5.beginShape();
                p5.vertex(state.arrowX, state.arrowY-45);
                p5.vertex(state.arrowX-15, state.arrowY-25);
                p5.vertex(state.arrowX+15, state.arrowY-25);
                p5.vertex(state.arrowX, state.arrowY-45);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY-6);
                p5.vertex(state.arrowX-10, state.arrowY-20);
                p5.vertex(state.arrowX+10, state.arrowY-20);
                p5.vertex(state.arrowX+10, state.arrowY-6);
                p5.vertex(state.arrowX-10, state.arrowY-6);
                p5.endShape();

            } else {

                p5.beginShape();
                p5.vertex(state.arrowX, state.arrowY+45);
                p5.vertex(state.arrowX-15, state.arrowY+25);
                p5.vertex(state.arrowX+15, state.arrowY+25);
                p5.vertex(state.arrowX, state.arrowY+45);
                p5.endShape();
    
                p5.beginShape();
                p5.vertex(state.arrowX-10, state.arrowY+6);
                p5.vertex(state.arrowX-10, state.arrowY+20);
                p5.vertex(state.arrowX+10, state.arrowY+20);
                p5.vertex(state.arrowX+10, state.arrowY+6);
                p5.vertex(state.arrowX-10, state.arrowY+6);
                p5.endShape();
            }
  
            p5.pop();
        }
    }

    p5.draw = drawAll();
};

export default function ScrollButton({top, direction, scrollTo, theme, color}: Props) {
    const [hover,   setHover] =  useState(false);
    const [sectionTop, setSectionTop] = useState(top);
    const onMouseEnter  = () =>   setHover(true);
    const onMouseLeave  = () =>  setHover(false);

    useEffect(() => setSectionTop(top), [sectionTop]);

    return (
        <button className="flex items-center relative justify-center"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => scrollTo()}>
            <NextReactP5Wrapper sketch={buttonSketch} hover={hover} toTop={direction} theme={theme} color={color}/>
        </button>
        
    )
}