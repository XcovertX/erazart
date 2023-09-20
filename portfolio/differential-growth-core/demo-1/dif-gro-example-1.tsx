import React, { useContext, useEffect, useState } from "react";
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
import { ThemeContext } from "../../context/context";


let nodecount: number = 0;
export function getID() {
  nodecount++;
  return nodecount;
}

type MySketchProps = SketchProps & {
    settings: Settings;
};

const sketch = function (p5: P5CanvasInstance<MySketchProps>) {

  let world: World = undefined;
  let settings: Settings = E01Settings;
  var canvas;
  var border: number = 0;
  const smWidth: number = 300;
  const smHeight: number = 300;
  const lgWidth: number = 500;
  const lgHeight: number = 500;

  p5.setup = function () {
    let w: number, h: number;
    if(window.innerWidth < 1200) {
      w = smWidth;
      h = smHeight;
    } else {
      w = lgWidth;
      h = lgHeight;
    }
    canvas = p5.createCanvas(w, h, p5.P2D);
    p5.colorMode(p5.HSB, 360);
    p5.ellipseMode(p5.RADIUS);
    setBorderWidth();
    p5.strokeWeight(1);
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

  p5.windowResized = () => {
    if(window.innerWidth < 1200) {
      p5.resizeCanvas(smWidth, smHeight);
    } else {
      p5.resizeCanvas(lgWidth, lgHeight);
    }
  }

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

    const p1: PositionType = {x: p5.width/2-10, y: p5.height/2 };
    const p2: PositionType = {x: p5.width/2+10, y: p5.height/2 };

    nodes.push(new Node(getID(), p5, p1, settings, true));
    nodes.push(new Node(getID(), p5, p2, settings, true));

    return nodes;
  }

  function creatLines(count: number) {
    let paths = new Array<Path>
    var pol:   number[][]  = [];

    const p1: PositionType = { x: border, y: border }
    const p2: PositionType = { x: p5.width - border, y: border }
    const p3: PositionType = { x: p5.width - border, y: p5.height - border }
    const p4: PositionType = { x: border, y: p5.height - border }

    pol.push([p1.x, p1.y])
    pol.push([p2.x, p2.y])
    pol.push([p3.x, p3.y])
    pol.push([p4.x, p4.y])

    const pb: PolygonBounds = new PolygonBounds(p5, pol)

    let nodes = new Array<Node>;
    const pa1: PositionType = {x: (p5.width-border)*(Math.random()) + border, y: (p5.height-border)*(Math.random()) + border };
    const pa2: PositionType = {x: (p5.width-border)*(Math.random()) + border, y: (p5.height-border)*(Math.random()) + border };
    const pa3: PositionType = {x: (p5.width-border)*(Math.random()) + border, y: (p5.height-border)*(Math.random()) + border };
    
    nodes.push(new Node(getID(), p5, pa1, settings, true));
    nodes.push(new Node(getID(), p5, pa2, settings, true));
    nodes.push(new Node(getID(), p5, pa3, settings, true));
    paths.push(new Path(p5, nodes, pb, settings))
    return paths;
  }

  function restartWorld() {
    
    world.clearPaths();
    let nodes: Node[]      = createLine();
    var pol:   number[][]  = [];

    const p1: PositionType = { x: border, y: border }
    const p2: PositionType = { x: p5.width - border, y: border }
    const p3: PositionType = { x: p5.width - border, y: p5.height - border }
    const p4: PositionType = { x: border, y: p5.height - border }

    let path: Path = new Path(p5, nodes, new PolygonBounds(p5, pol), settings);
    let paths: Path[] = creatLines(10);
    // paths.push(creatLines(1)[0])

    for (let i = 0; i < paths.length; i++) {
      world.addPath(paths[i]);
    }

    // world.addPath(path);
    world.drawBackground();
    world.draw();
  }
}

export default function DifferentialGrowthContainer() 
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
    const { theme } = useContext(ThemeContext);
    return (
      <div className={`${theme == 'dark'? 'text-zinc-100 bg-emerald-800/[.5]' : 'text-emerald-950 bg-emerald-300' } font-bold p-5 flex flex-row`}>
        <div className={` text-sm flex-col flex mr-3 justify-between`}>
          <div className="flex flex-row justify-around mb-3">
            <button className={`${theme == 'dark'? 'bg-emerald-500 text-emerald-950' : 'bg-emerald-800 text-zinc-100' } text-lg rounded-md flex-grow py-3 px-5 mr-3 font-bold`} onClick={handleChangeRun}>{setting.paused ? 'run' : 'pause'}</button>
            <button className={`${theme == 'dark'? 'bg-emerald-500 text-emerald-950' : 'bg-emerald-800 text-zinc-100' } text-lg rounded-md flex-grow py-3 px-5 font-bold`} onClick={handleChangeRestart}>restart</button>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } flex flex-col mb-3 border-2 p-2 justify-between`}>
            <div className="flex flex-row justify-between items-center">
              <h6>Min Node Distance</h6>
            </div>
            <CustomSlider title={''} id={''} min={.1} max={30} 
                        step={.1} value={setting.minDistance} onChange={handleChangeMin} ref={null}/>
            <div className="flex flex-row justify-between items-center">
              <h6>Max Node Distance</h6>
            </div>
            <CustomSlider title={''} id={''} min={.1} max={30} 
                        step={.1} value={setting.maxDistance} onChange={handleChangeMax} ref={null}/>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } flex flex-col mb-3 border-2 p-2 justify-between`}>
            <div className="flex flex-row justify-between items-center">
              <h6>Repulsion Force</h6>
            </div>
            <CustomSlider title={''}  id={''} min={.01} max={3} 
                        step={.01} value={setting.repulsionScalar} onChange={handleChangeRepulse} ref={null}/>
            <div className="flex flex-row justify-between items-center">
              <h6>Repulsion Radius</h6>
            </div>
            <CustomSlider title={''} id={''} min={1} max={10} 
                        step={.1}  value={setting.repulsionRadius} onChange={handleChangeRepulseRad} ref={null}/>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } flex flex-col mb-3 border-2 p-2 justify-between`}>
            <div className="flex flex-row justify-between items-center">
              <h6>Attraction Force</h6>
            </div>
            <CustomSlider title={''} id={''} min={1}  max={30} 
                        step={.1} value={setting.attractionScalar} onChange={handleChangeAttract} ref={null}/>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } flex flex-col mb-3 border-2 p-2 justify-between`}>
            <div className="flex flex-row justify-between items-center">
              <h6>Alignment Force</h6>
            </div>
            <CustomSlider title={''}  id={''} min={0}  max={2} 
                        step={.01} value={setting.alignmentScalar} onChange={handleChangeAlign} ref={null}/>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } flex flex-col border-2 p-2 justify-between`}>
            <div className="flex flex-row justify-between items-center">
              <h6>Brownian Force</h6>
              <Toggle title={'Browinan Mode'} onChange={handleChangeBrownMode} currentState={setting.brownianMode} color={'bg-gray-500'}/>
            </div>
            <CustomSlider title={''}   id={''} min={0}  max={2} 
                          step={.01} value={setting.brownianScalar} onChange={handleChangeBrown} ref={null}/>
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <NextReactP5Wrapper sketch={sketch} settings={{...setting}} />
        </div>
        <div className=" flex flex-col ml-3 justify-between">
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } border-2 p-2 mb-3`}>
            <h6 className="flex justify-center">Stroke Color</h6>
            <CustomSlider title={'H'} id={''} min={0} max={360} 
                          step={.1} value={setting.fillColor.h} onChange={handleChangeFillColorH} ref={null}/>
            <CustomSlider title={'S'} id={''} min={0} max={360} 
                          step={.1} value={setting.fillColor.s} onChange={handleChangeFillColorS} ref={null}/>
            <CustomSlider title={'B'} id={''} min={0} max={360} 
                          step={.1} value={setting.fillColor.b} onChange={handleChangeFillColorB} ref={null}/>
            <CustomSlider title={'A'} id={''} min={0} max={360} 
                          step={.1} value={setting.fillColor.a} onChange={handleChangeFillColorA} ref={null}/>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } border-2 p-2 mb-3`}>
            <h6 className="flex justify-center">Background Color</h6>
            <CustomSlider title={'H'} id={''} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.h} onChange={handleChangeBGColorH} ref={null}/>
            <CustomSlider title={'S'} id={''} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.s} onChange={handleChangeBGColorS} ref={null}/>
            <CustomSlider title={'B'} id={''} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.b} onChange={handleChangeBGColorB} ref={null}/>
            <CustomSlider title={'A'} id={''} min={0} max={360} 
                          step={.1} value={setting.backgroundColor.a} onChange={handleChangeBGColorA} ref={null}/>
          </div>
          <div className={`${theme == 'dark'? 'border-emerald-300 ' : 'border-emerald-950' } border-2 p-2`}>
            <div className="flex flex-row justify-between items-center">
              <h6>Draw Nodes</h6>
              <Toggle title={''} onChange={handleChangeNodesMode} currentState={setting.drawNodesMode} color={'bg-gray-500'}/>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Show Bounds</h6>
              <Toggle title={''} onChange={handleChangeShowBounds} currentState={setting.showBoundsMode} color={'bg-gray-500'}/>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Fill Mode</h6>
              <Toggle title={''} onChange={handleChangeFillMode} currentState={setting.fillMode} color={'bg-gray-500'}/>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Trace Mode</h6>
              <Toggle title={''} onChange={handleChangeTraceMode} currentState={setting.traceMode} color={'bg-gray-500'}/>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Close Path</h6>
              <Toggle title={''} onChange={handleChangeClosed} currentState={setting.isClosed} color={'bg-gray-500'}/>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h6>Debug Mode</h6>
              <Toggle title={''} onChange={handleChangeDebugMode} currentState={setting.debugMode} color={'bg-gray-500'}/>
            </div>
          </div>
        </div>
      </div>
    )
}