import React, { useEffect, useState } from "react";
import {  SketchProps, P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Node from "../node";
import Path from "../path";
import World from "../world";
import { E02Settings } from "./settings";
import PositionType from "../../interfaces/position";
import PolygonBounds from "../polygon-bounds";
import Settings from "../interfaces/settings";
import { CustomSlider } from "../../components/slider";
import { Toggle } from "../../components/toggle";
import { getLetter } from "./letters";


let nodecount: number = 0;
export function getID() {
  nodecount++;
  return nodecount;
}

type MySketchProps = SketchProps & {
    settings: Settings;
    word: string;
};

const sketch = function (p5: P5CanvasInstance<MySketchProps>) {

  let world:    World    = undefined;
  let settings: Settings = E02Settings;
  let word:     string = '';
  var border:   number   = 0;
  var canvas;

  p5.setup = function () {
    canvas = p5.createCanvas(600, 300, p5.P2D);
    p5.colorMode(p5.HSB, 360);
    p5.ellipseMode(p5.RADIUS);
    setBorderWidth();

    p5.updateWithProps = props => {
      if(settings.restart != props.settings.restart) {
        restartWorld();
      }
      settings = Object.assign(settings, props.settings);
      if(props.word != word){
        word = props.word;
        restartWorld();
      }
      
    }
    world = new World(settings);
    world.p5 = p5;
    restartWorld();
  }

  // p5.windowResized = () => {
  //   p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  // }

  let t = 0;
  p5.draw = () => {
    world.iterate();
    world.draw();
  }

  function setBorderWidth() {
    if(p5.width > p5.height) {
      border = p5.height * settings.border;
    } else {
      border = p5.width  * settings.border;
    };
  }

  function createLine() {
    let nodes = new Array<Node>;

    const p1: PositionType = {x: border, y: 135 };
    const p2: PositionType = {x: p5.width - border, y: 135 };

    nodes.push(new Node(getID(), p5, p1, settings, true));
    nodes.push(new Node(getID(), p5, p2, settings, true));

    return nodes;
  }

  function restartWorld() {
    
    world.clearPaths();

    for (let i = 0; i < word.length; i++) {
        const l: string = word.at(i);
        let letter = getLetter(l);

        for (let j = 0; j < letter.length; j++) {
            letter[j][0] = (letter[j][0]/word.length*3.5  + (p5.width/word.length  * i) + 5);
            letter[j][1] = letter[j][1] *1.25
        };
        let nodes = new Array<Node>;
        const p1: PositionType = { x: letter[0][0],  y: 50 };
        const p2: PositionType = { x: letter[0][0] + 5, y: 50 };
        nodes.push(new Node(getID(), p5, p1, settings, true));
        nodes.push(new Node(getID(), p5, p2, settings, true));
        world.addPath(new Path(p5, nodes, new PolygonBounds(p5, letter), settings));
    }

    world.drawBackground();
    world.draw();
  }
}

export default function DifferentialLetters() 
{
  const [setting, setSetting] = useState(E02Settings);
  const [w, setW] = useState('');
  const [word, setWord] =useState('');

  function handleChangeEnter() {
    setWord(w);
  }

  function handleChangeRun() {
    let s = setting;
    s.paused = !setting.paused;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeRestart() {
    let s = setting;
    s.restart = !s.restart;
    setSetting({...Object.assign(setting, s)});
  }

  useEffect(() => {
    setSetting(setting);
  }, [{...setting}, word]);

    return (
      <div className="flex flex-col">
        <div className="flex justify-around">
          <NextReactP5Wrapper sketch={sketch} settings={{...setting}} word={word} />
        </div>
        <div className="flex-col">
          <label className="flex-row justify-start flex items-center">
            Type a word:
            <input className="border-2 m-3 flex-grow" 
                   onChange={(e) => {setW(e.target.value)}}
                   value={w}/>
          </label>
          <div className="flex flex-row justify-around">
              <button className="flex-grow py-3 px-5 mr-3 bg-slate-900 font-bold text-zinc-300" onClick={handleChangeEnter}>Enter</button>
              <button className="flex-grow py-3 px-5 mr-3 bg-slate-900 font-bold text-zinc-300" onClick={handleChangeRun}>{setting.paused ? 'run' : 'pause'}</button>
              <button className="flex-grow py-3 px-5 bg-slate-900 font-bold text-zinc-300" onClick={handleChangeRestart}>restart</button>
            </div>
        </div>
      </div>
    )
}