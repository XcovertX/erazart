import React, { useEffect, useState } from "react";
import {  SketchProps, P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Node from "../node";
import Path from "../path";
import World from "../world";
import { E01Settings } from "./settings";
import PositionType from "../../interfaces/position";
import PolygonBounds from "../polygon-bounds";
import Settings from "../interfaces/settings";
import { CustomSlider } from "../../components/slider";
import { Toggle } from "../../components/toggle";


let nodecount: number = 0;
export function getID() {
  nodecount++;
  return nodecount;
}

type MySketchProps = SketchProps & {
    settings: Settings;
};

const sketch = function (p5: P5CanvasInstance<MySketchProps>) {

  let world:    World    = undefined;
  let settings: Settings = E01Settings;
  var border:   number   = 0;
  var canvas;

  p5.setup = function () {
    canvas = p5.createCanvas(600, 600, p5.P2D);
    p5.colorMode(p5.HSB, 360);
    p5.ellipseMode(p5.RADIUS);
    setBorderWidth();

    p5.updateWithProps = props => {
      if(settings.restart != props.settings.restart) {
        restartWorld();
      }
      settings = Object.assign(settings, props.settings);
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

  function createLetter(letter: string) {
    switch (letter) {

        case 'R': return [[30,   30], [115,  30], [135,  45], [135, 110], [115, 125], [135, 140], 
                          [135, 210], [100, 210], [100, 140], [60, 140], [60, 210], 
                          [30,  210], [30,  30]]
        case 'A': return [[30,   30], [130,  30], [130, 210], [100, 210], [100, 140], [60, 140], [60, 210], 
                          [30,  210], [30,  30]]
        case 'Z': return [[30, 30],   [130, 30],  [130, 100], [80, 160],  [130, 160], [130, 210], 
                          [30, 210],  [30, 150],  [80, 80],   [30, 80],   [30, 30]]
        case 'B': return [[30,   30], [115, 30],  [135,  45], [135, 110], [115, 125], [135, 140], 
                          [135, 210], [135, 195], [115, 210], [30,  210], [30,  30]]
        case 'C': return [[30,   30], [130,  30], [130, 60], [60,  60],   [60, 180],  [130, 180], 
                          [130, 210], [30,  210], [30,  30]]
        case 'D': return [[30,   30], [115, 30],  [135,  45],  
                          [135, 210], [135, 195], [115, 210], [30,  210], [30,  30]]
        case 'E': return [[30,   30], [130,  30], [130, 60], [60,  60], [60,  100], 
                          [110, 100], [110, 130], [60, 130], [60, 180], [130, 180], 
                          [130, 210], [30,  210], [30,  30]]
        case 'F': return [[30,   30], [130,  30], [130, 60], [60,  60], [60,  100], 
                          [110, 100], [110, 130], [60, 130], [60, 210], [30,  210], [30,  30]]
        case 'G': return [[30,   30], [135,  30], [135, 60], [60,  60], [60,  180], 
                          [110, 180], [110, 100], [135, 100], [135, 210], [30, 210], [30,  30]]
        case 'H': return [[30,   30], [60,   30], [60, 110], [100, 110], [100, 30], [130,  30], [130, 210], [100, 210], [100, 140], [60, 140], [60, 210], 
                          [30,  210], [30,  30]]
    }
  }

  function restartWorld() {
    
    world.clearPaths();
    const word: string[] = ['E', 'E', 'E', 'E']

    for (let i = 0; i < word.length; i++) {
        const l: string = word.at(i);
        let letter = createLetter(l);
        let nodes = new Array<Node>;
        const p1: PositionType = { x: (border + i * 135 + 25)/2,  y: 45 };
        const p2: PositionType = { x: (border + i * 135 + 55)/2, y: 45 };
        nodes.push(new Node(getID(), p5, p1, settings, true));
        nodes.push(new Node(getID(), p5, p2, settings, true));
        for (let j = 0; j < letter.length; j++) {
            letter[j][0] = (letter[j][0]  + (140 * i)) * 1/2;
        };

        world.addPath(new Path(p5, nodes, new PolygonBounds(p5, letter), settings));
    }

    world.drawBackground();
    world.draw();
  }
}

export default function DifferentialLetters() 
{
  const [setting, setSetting] = useState(E01Settings);

  function handleChangeBrown(event) {
    let s = setting;
    s.brownianScalar = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeRepulse(event) {
    let s = setting;
    s.repulsionScalar = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeRepulseRad(event) {
    let s = setting;
    s.repulsionRadius = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeMax(event) {
    let s = setting;
    s.maxDistance = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeMin(event) {
    let s = setting;
    s.minDistance = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeAlign(event) {
    let s = setting;
    s.alignmentScalar = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeAttract(event) {
    let s = setting;
    s.attractionScalar = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeFillColorH(event) {
    let s = setting;
    s.fillColor.h = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeFillColorS(event) {
    let s = setting;
    s.fillColor.s = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeFillColorB(event) {
    let s = setting;
    s.fillColor.b = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeFillColorA(event) {
    let s = setting;
    s.fillColor.a = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeBGColorH(event) {
    let s = setting;
    s.backgroundColor.h = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeBGColorS(event) {
    let s = setting;
    s.backgroundColor.s = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeBGColorB(event) {
    let s = setting;
    s.backgroundColor.b = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeBGColorA(event) {
    let s = setting;
    s.backgroundColor.a = event.target.value;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeBrownMode(event) {
    let s = setting;
    s.brownianMode = event.target.checked;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeNodesMode(event) {
    let s = setting;
    s.drawNodesMode = event.target.checked;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeDebugMode(event) {
    let s = setting;
    s.debugMode = event.target.checked;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeTraceMode(event) {
    let s = setting;
    s.traceMode = event.target.checked;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeFillMode(event) {
    let s = setting;
    s.fillMode = event.target.checked;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeShowBounds(event) {
    let s = setting;
    s.showBoundsMode = event.target.checked;
    setSetting({...Object.assign(setting, s)});
  }

  function handleChangeClosed(event) {
    let s = setting;
    s.isClosed = event.target.checked;
    setSetting({...Object.assign(setting, s)});
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
  }, [{...setting}]);

    return (
      <div className="flex flex-row">
        <div className="flex flex-col justify-around">
          <NextReactP5Wrapper sketch={sketch} settings={{...setting}} />
        </div>
        <div className='text-sm flex-col flex ml-3 justify-between'>
          <div className="flex flex-col mb-3 border-2 px-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <h6>Min Node Distance</h6>
            </div>
            <CustomSlider title={''} id={'ALF'} min={1} max={30} 
                        step={.01} value={setting.minDistance} onChange={handleChangeMin}/>
            <div className="flex flex-row justify-between items-center">
              <h6>Max Node Distance</h6>
            </div>
            <CustomSlider title={''} id={'ALF'} min={1} max={30} 
                        step={.01} value={setting.maxDistance} onChange={handleChangeMax}/>
          </div>
          <div className="flex flex-col mb-3 border-2 px-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <h6>Repulsion Force</h6>
            </div>
            <CustomSlider title={''}  id={'ALF'} min={.01} max={5} 
                        step={.01} value={setting.repulsionScalar} onChange={handleChangeRepulse}/>
            <div className="flex flex-row justify-between items-center">
              <h6>Repulsion Radius</h6>
            </div>
            <CustomSlider title={''} id={'ALF'} min={1} max={15} 
                        step={.01}  value={setting.repulsionRadius} onChange={handleChangeRepulseRad}/>
          </div>
          <div className="flex flex-col mb-3 border-2 px-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <h6>Attraction Force</h6>
            </div>
            <CustomSlider title={''} id={'ALF'} min={0}  max={30} 
                        step={.1} value={setting.attractionScalar} onChange={handleChangeAttract}/>
          </div>
          <div className="flex flex-col mb-3 border-2 px-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <h6>Alignment Force</h6>
            </div>
            <CustomSlider title={''}  id={'ALF'} min={0}  max={2} 
                        step={.01} value={setting.alignmentScalar} onChange={handleChangeAlign}/>
          </div>
          <div className="flex flex-col mb-3 border-2 px-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <h6>Brownian Force</h6>
              <Toggle title={'Browinan Mode'} onChange={handleChangeBrownMode} currentState={setting.brownianMode} />
            </div>
            <CustomSlider title={''}   id={'ALF'} min={0}  max={2} 
                          step={.01} value={setting.brownianScalar} onChange={handleChangeBrown}/>
          </div>
          <div className="flex flex-row justify-around">
            <button className="flex-grow py-3 px-5 mr-3 bg-slate-900 font-bold text-zinc-300" onClick={handleChangeRun}>{setting.paused ? 'run' : 'pause'}</button>
            <button className="flex-grow py-3 px-5 bg-slate-900 font-bold text-zinc-300" onClick={handleChangeRestart}>restart</button>
          </div>
        </div>
        <div className=" flex flex-col justify-between ml-3">
          <div className="border-2 px-2 mb-3">
            <h6 className="flex justify-center">Stroke Color</h6>
            <CustomSlider title={'H'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.fillColor.h} onChange={handleChangeFillColorH}/>
            <CustomSlider title={'S'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.fillColor.s} onChange={handleChangeFillColorS}/>
            <CustomSlider title={'B'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.fillColor.b} onChange={handleChangeFillColorB}/>
            <CustomSlider title={'A'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.fillColor.a} onChange={handleChangeFillColorA}/>
          </div>
          <div className="border-2 px-2 mb-3">
            <h6 className="flex justify-center">Background Color</h6>
            <CustomSlider title={'H'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.h} onChange={handleChangeBGColorH}/>
            <CustomSlider title={'S'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.s} onChange={handleChangeBGColorS}/>
            <CustomSlider title={'B'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.b} onChange={handleChangeBGColorB}/>
            <CustomSlider title={'A'} id={'ALF'} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.a} onChange={handleChangeBGColorA}/>
          </div>
          <div className="border-2 px-2">
            <div className="flex flex-row justify-between items-center">
              <h6>Draw Nodes</h6>
              <Toggle title={''} onChange={handleChangeNodesMode} currentState={setting.drawNodesMode} />
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Show Bounds</h6>
              <Toggle title={''} onChange={handleChangeShowBounds} currentState={setting.showBoundsMode} />
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Fill Mode</h6>
              <Toggle title={''} onChange={handleChangeFillMode} currentState={setting.fillMode} />
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Trace Mode</h6>
              <Toggle title={''} onChange={handleChangeTraceMode} currentState={setting.traceMode} />
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Close Path</h6>
              <Toggle title={''} onChange={handleChangeClosed} currentState={setting.isClosed} />
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Debug Mode</h6>
              <Toggle title={''} onChange={handleChangeDebugMode} currentState={setting.debugMode} />
            </div>
          </div>
        </div>
      </div>
    )
}