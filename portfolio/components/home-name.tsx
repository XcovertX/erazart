import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/context";
import p5, { Renderer } from "p5";

type Props = {
    location: string;
}

type MySketchProps = SketchProps & {
    color: string;
    darkMode: boolean;
};

const Title = ({ location }: Props) => {

    const { theme } = useContext(ThemeContext);
    
    const sketch = (p5: P5CanvasInstance<MySketchProps>) => {
        var state = {
            darkMode: false,
            color: 'bg-amber-500',
            w: 50,
            h: 500,
            location: 'home'
        }

        var font;

        p5.preload = () => {   
            font = p5.loadFont('assets/fonts/RostavePersonalUse-Eaylz.otf');
        }
    
        function fillColorSelect(color) {
            switch (color) {
                default             : return p5.color('#f59e0b');
            }
        }

    // p5.windowResized = () => {
    //     p5.resizeCanvas(state.w, state.h);
    // }

    p5.setup = () => {
        p5.createCanvas(state.w, state.h, p5.P2D);
        p5.colorMode(p5.HSB, 360);
        p5.noLoop();
        p5.noStroke();
        p5.textFont(font);
        console.log("ran name ---------")
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
        p5.redraw();
    }

    function drawAll() {

        return () => {

            if(state.location == "home") {
                if(state.darkMode) {
                    p5.fill(p5.color('#6ee7b7'));
                } else {
                    p5.fill(p5.color('#fcd34d'));
                }
            } else {
                p5.fill(fillColorSelect(state.color));
            }
            p5.textSize(30);
            p5.background(30)
            p5.translate(100, 180);
            p5.rotate(p5.radians(-90))
            p5.textAlign(p5.RIGHT, p5.BOTTOM)
            p5.text('JAMES COVERT', 150, -50);
            
        }
    }

    p5.draw = drawAll();

    return p5;
    }

    const [p5Wrapper, setp5Wrapper] = useState(<></>);
    useEffect(() => {
        setp5Wrapper(<NextReactP5Wrapper sketch={sketch} darkMode={theme == "dark"} location={location}/>)
    }, [])

    return (
        <>{p5Wrapper}</>
    )}

export default Title