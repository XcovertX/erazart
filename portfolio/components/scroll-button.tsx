import React, { useEffect, useState, useRef } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
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
    darkMode: boolean;
    color: string;
}

function buttonSketch(p5: P5CanvasInstance<MySketchProps>) {

    var state = {
        hover: false,
        toTop: true,
        arrowX: 50,
        arrowY: 70,
        arrowBounce: 0,
        darkMode: false,
        color: ''
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

    function fillColorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return p5.color(0, 360, 360);
            case 'bg-teal-600'  : return p5.color(20, 360, 360);
            case 'bg-indigo-600': return p5.color(40, 360, 360);
            case 'bg-purple-600': return p5.color(60, 360, 360);
            case 'bg-rose-600'  : return p5.color(180, 360, 360);
            default             : return p5.color(0, 360, 360);
        }
    }

    function strokeColorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return p5.color('#14532d');
            case 'bg-teal-600'  : return p5.color('#0d9488');
            case 'bg-indigo-600': return p5.color('#4f46e5');
            case 'bg-purple-600': return p5.color('#9333ea');
            case 'bg-rose-600'  : return p5.color('#e11d48');
            default             : return p5.color('#16a34a');
        }
    }

    function shadowColorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return p5.color('#14532d');
            case 'bg-teal-600'  : return p5.color('#134e4a');
            case 'bg-indigo-600': return p5.color('#312e81');
            case 'bg-purple-600': return p5.color('#581c87');
            case 'bg-rose-600'  : return p5.color('#881337');
            default             : return p5.color('black');
        }
    }

    function highlightColorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return p5.color('#22c55e');
            case 'bg-teal-600'  : return p5.color('#14b8a6');
            case 'bg-indigo-600': return p5.color('#6366f1');
            case 'bg-purple-600': return p5.color('#a855f7');
            case 'bg-rose-600'  : return p5.color('#f43f5e');
            default             : return p5.color('white');
        }
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

            if (state.hover){
                if(state.darkMode) {
                    p5.fill(highlightColorSelect(state.color))
                    p5.noStroke();
                    p5.drawingContext.shadowColor = p5.color(highlightColorSelect(state.color));
                    p5.drawingContext.shadowBlur = 5;
                } else {
                    p5.noStroke();
                    p5.fill(fillColorSelect(state.color));
                }

            } else {
                p5.noFill();
                p5.strokeWeight(2);
                if(state.darkMode) {
                    p5.stroke(highlightColorSelect(state.color));
                    p5.drawingContext.shadowColor = fillColorSelect(state.color);
                } else {
                    p5.noStroke()
                    p5.fill(highlightColorSelect(state.color));
                }

                let offsetX, offsetY;

                if(state.darkMode) {
                    offsetX = p5.map(p5.mouseX, 0, p5.width, 1, -1);
                    offsetY = p5.map(p5.mouseY, 0, p5.height, 1, -1);
                    p5.drawingContext.shadowOffsetX = offsetX;
                    p5.drawingContext.shadowOffsetY = offsetY;
                }
                
            }

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

export default function ScrollButton({top, direction, scrollTo, darkMode, color}: Props) {
    const [hover,   setHover] =  useState(false);
    const [sectionTop, setSectionTop] = useState(top);
    const onMouseEnter  = () =>   setHover(true);
    const onMouseLeave  = () =>  setHover(false);

    useEffect(() => setSectionTop(top), [sectionTop]);

    return (
        <button className="flex items-center relative justify-center"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => scrollTo(sectionTop)}>
            <NextReactP5Wrapper sketch={buttonSketch} hover={hover} toTop={direction} darkMode={darkMode} color={color}/>
        </button>
        
    )
}