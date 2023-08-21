import React, { useEffect, useState, useRef } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

type MySketchProps = SketchProps & {
    hover: boolean;
};

function buttonSketch(p5: P5CanvasInstance<MySketchProps>) {

    var state = {
        hover: false
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
        canvas = p5.createCanvas(100, 100, p5.P2D);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
        p5.background(0, 0, 0, 0);
        
        cartLayer = p5.createGraphics(window.innerWidth, window.innerHeight)
        cartLayer.position(0,0);
        cartLayer.colorMode(p5.HSB, 360)
        cartLayer.strokeWeight(3);
        cartLayer.ellipseMode(p5.RADIUS);
    }

    function drawAll() {

        return () => {
            if (state.hover){
                p5.background(160, 360, 360, 100)
            } else {
                p5.clear(0, 0, 0, 0);
            }
            p5.push();
            p5.fill(10, 100, 100)
            p5.rect(10, 10, 50, 50);
            p5.pop();
        }
    }

    p5.draw = drawAll();
};



export default function ScrollButton(props: {top: number}) {
    const [hover,   setHover] =  useState(false);
    const [sectionTop, setSectionTop] = useState(props.top);
    const onMouseEnter  = () =>   setHover(true);
    const onMouseLeave  = () =>  setHover(false);

    useEffect(() => setSectionTop(props.top * window.innerHeight), [sectionTop]);

    const scrollTo = () => {
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
        });
    };

    return (
        <button className="flex items-center relative justify-center"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={scrollTo}>
            <NextReactP5Wrapper sketch={buttonSketch} hover={hover}/>
        </button>
        
    )
}