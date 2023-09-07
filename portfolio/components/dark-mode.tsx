import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { useContext } from "react";
import { ThemeContext } from "../context/context";

type Props = {
    headingColor: string;
    location: string;
}

type MySketchProps = SketchProps & {
    color: string;
    darkMode: boolean;
};

const ThemeToggle = ({ headingColor, location }: Props) => {

    const { theme, handleThemeChange } = useContext(ThemeContext);

    function colorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return 'after:bg-green-600 bg-green-400 ring-green-700 peer-checked:bg-green-800 peer-checked:ring-green-900';
            case 'bg-teal-600'  : return 'after:bg-teal-600 bg-teal-400 ring-teal-700 peer-checked:bg-teal-900 peer-checked:ring-teal-900';
            case 'bg-indigo-600': return 'after:bg-indigo-600 bg-indigo-400 ring-indigo-700 peer-checked:bg-indigo-900 peer-checked:ring-indigo-900';
            case 'bg-purple-600': return 'after:bg-purple-600 bg-purple-400 ring-purple-700 peer-checked:bg-purple-900 peer-checked:ring-purple-900';
            case 'bg-rose-600'  : return 'after:bg-rose-600 bg-rose-400 ring-rose-700 peer-checked:bg-rose-900 peer-checked:ring-rose-900';
        }
    }

    const sketch = (p5: P5CanvasInstance<MySketchProps>) => {
        var state = {
            darkMode: false,
            color: 'bg-gray-500',
            w: 24,
            h: 24,
            location: ''
        }

        var canvas;
    
        function fillColorSelect(color) {
            switch (color) {
                case 'bg-green-600' : return p5.color('#16a34a');
                case 'bg-teal-600'  : return p5.color('#0d9488');
                case 'bg-indigo-600': return p5.color('#4f46e5');
                case 'bg-purple-600': return p5.color('#9333ea');
                case 'bg-rose-600'  : return p5.color('#e11d48');
                default             : return p5.color('#16a34a');
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

    p5.windowResized = () => {
        p5.resizeCanvas(state.w, state.h);
    }

    p5.setup = () => {
        canvas = p5.createCanvas(state.w, state.h, p5.P2D);
        canvas.position(0,0);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
        p5.noLoop();
        p5.noStroke();
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
        p5.redraw();
    }

    function drawAll() {

        return () => {
            if(state.location == "home") {
                p5.fill(p5.color('#f4f4f5'));
            } else {
                p5.fill(fillColorSelect(state.color));
            }
            
            p5.ellipse(canvas.width/2, canvas.height/2, 8);
            if(state.darkMode){
                p5.push();
                p5.erase();
                p5.ellipse(canvas.width/2 + 2.5, canvas.height/2 - 2.5, 6.75);
                p5.pop();    
            } 
        }
    }

    p5.draw = drawAll();
    }

    return (
        <div className='fixed right-0 top-9 z-50 text-zinc-100'>
            <div className='flex flex-col'>
                <div className='fixed top-1 right-7'>
                    <NextReactP5Wrapper sketch={sketch} color={headingColor} darkMode={theme == "dark"} location={location}/>
                </div>
                <div className="flex flex-row items-center justify-right mt-1">
                    <label className="relative flex items-center cursor-pointer">       
                        <input type="checkbox" 
                                className="sr-only peer " 
                                checked={theme == "dark"} 
                                onChange={handleThemeChange}/>
                        <div className={`w-8 h-4 
                                         rounded-full 
                                         peer 
                                         ring-2
                                         peer-checked:after:translate-x-full  
                                         after:content-[''] 
                                         after:absolute 
                                         after:top-0.5
                                         after:right-[16px]
                                         ${colorSelect(headingColor)} 
                                         after:rounded-full 
                                         after:h-3 after:w-3 
                                         after:transition-all 
                                         rotate-90`}>
                                
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )}

export default ThemeToggle