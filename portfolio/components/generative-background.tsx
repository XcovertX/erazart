import React, { useEffect, useState } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type CartType from "../interfaces/cart";
import type PartType from "../interfaces/part";
import type PositionType from "../interfaces/position";


type MySketchProps = SketchProps & {
    rotation: number;
    carts: Array<CartType>;
    grid: boolean;
};

//draws grid to the screen
function drawGrid(p5: P5CanvasInstance<MySketchProps>, w:number, h: number, ) {
    
    p5.push();
    p5.strokeWeight(1);
    p5.stroke(0, 360, 360);

    const xCount = window.innerWidth  / w;
    const yCount = window.innerHeight / h;

    for (let index = 0; index < xCount; index++) {
        let x = index * w;
        p5.line(x, 0, x, window.innerHeight);
    }
    for (let index = 0; index < yCount; index++) {
        let y = index * h;
        p5.line(0, y, window.innerWidth, y);
    }

    p5.pop();
}

function drawCarts(p5: P5CanvasInstance<MySketchProps>, carts: CartType[], grid: boolean){

   return () => {
        if (grid) {
            drawGrid(p5, carts[0].width, carts[0].height);
        } 
        for (let i = 0; i < carts.length; i++) {
            var c = carts[i];
            for (let j = 0; j < c.parts.length; j++) {
                var p = c.parts[j];
                p5.push();
                p5.strokeWeight(3);
                p5.stroke(155, 360, 0)
                p5.fill(0, 360, 360);
                p5.ellipse(p.position.x, p.position.y, c.width, c.height);
                p5.pop();
            }
        }
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition(minW: number, maxW: number, minH: number, maxH: number) {
    var p: PositionType = {
        x: getRandomInt(minW, maxW),
        y: getRandomInt(minH, maxH)
    }
    return p;
}

function getRandomDirection() {
    const dir = getRandomInt(0, 3);
    switch(dir) {
        case 0:  return "NORTH";
        case 1:  return "SOUTH";
        case 2:  return "EAST";
        case 3:  return "WEST";
        default: return "NORTH"
    }
}

function getRandomColor() {
    const color = getRandomInt(0, 3);
    switch(color) {
        case 0:  return 131;
        case 1:  return 21;
        case 2:  return 120;
        case 3:  return 0;
        default: return 0
    }
}

function getRandomContainerPosition(partW: number, cartPosition: PositionType) {
    const selection = getRandomInt(0, 2);
    var partX: number;
    switch(selection) {
        case 0:  partX = partW * cartPosition.x *  0.5;
            break;
        case 1:  partX = cartPosition.x;
            break;
        case 2:  partX = partW * cartPosition.x * -0.5;
            break;
        default: partX = cartPosition.x;
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomAccentPosition(partW: number, cartPosition: PositionType) {
    const selection = getRandomInt(0, 7);
    var partX: number;
    switch(selection) {
        case 0:  partX = partW * cartPosition.x * 0.125;
            break;
        case 1:  partX = partW * cartPosition.x * 0.25;
            break;
        case 2:  partX = partW * cartPosition.x * 0.5;
            break;
        case 3:  partX = partW * cartPosition.x;
            break;
        case 4:  partX = partW * cartPosition.x * -1;
            break;
        case 5:  partX = partW * cartPosition.x * -0.5;
            break;
        case 6:  partX = partW * cartPosition.x * -0.25;
            break;
        case 7:  partX = partW * cartPosition.x * -0.125;
            break;
        default: partX = partW * cartPosition.x;
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomPartShape() {
    const selection = getRandomInt(0, 17);
     switch(selection) {
        case 0: return  "BOX-LG";
        case 1: return  "BOX-SM";
        case 2: return  "CIRCLE-SM";
        case 3: return  "CIRCLE-LG";
        case 4: return  "CIRCLE-DOT";
        case 5: return  "BOX-X";
        case 6: return  "DOUBLE-DOT-HORIZONTAL";
        case 7: return  "DOUBLE-DOT-VERTICAL";
        case 8: return  "QUAD-DOT-CROSS";
        case 9: return  "QUAD-DOT-X";
        case 10: return "DOT";
        case 11: return "CROSS";
        case 12: return "THREE-LINES-VERTICAL";
        case 13: return "THREE-LINES-HORIZONTAL";
        case 14: return "X";
        case 15: return "DIAG-LEFT";
        case 16: return "DIAG-RIGHT";
        case 17: return "DIAMOND";
        default: return "X"
     }
}

function buildNewPart(cartPosition: PositionType, color: number) {
    var shape: string = getRandomPartShape();
    const partW: number = 20;
    const partH: number = 20;
    var position: PositionType;

    if (shape == "BOX-LG"     ||
        shape =="BOX-SM"      ||
        shape == "CIRCLE-SM"  ||
        shape == "CIRCLE-LG"  ||
        shape == "CIRCLE-DOT" ||
        shape == "BOX-X"      ||
        shape == "X"          ||
        shape == "DIAG-LEFT"  ||
        shape == "DIAG-RIGHT" ||
        shape == "DIAMOND") {
            position = getRandomContainerPosition(partW, cartPosition)
        } else {
            position = getRandomAccentPosition(partW, cartPosition);
        }
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: partW,
        height: partH
    };
    return p;
}

// generates a give number of uniques carts
function generateCarts(cartCount: number, partCount: number, w: number, h: number, cartColor: number) {
    let carts = new Array(cartCount);

    for (let i = 0; i < cartCount; i++) {
        var cartPosition: PositionType = getRandomPosition(0, w, 0, h);
        var parts = new Array(partCount);
        for (let j = 0; j < partCount; j++) {
            parts[j] = buildNewPart(cartPosition, cartColor);
        }
        var cart: CartType = {
            id: i,
            position: cartPosition,
            age: 0,
            height: 20,
            width: 20,
            isTransitioning: false,
            transitionCount: 0,
            parts: parts,
            speed: 100,
            direction: getRandomDirection()
        }
        carts[i] = cart;
    }
    return carts;
}

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    let rotation = 0;
    let carts = [];
    var canvas;

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.setup = () => {
        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.P2D);
        canvas.position(0,0);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 100);
        p5.ellipseMode(p5.RADIUS);
    }

    p5.updateWithProps = (props) => {
        if (props.rotation) {
            rotation = (props.rotation * Math.PI) / 180;
        } 
        if (props.carts){
            console.log(props.carts)
            carts = props.carts;
            p5.draw = drawCarts(p5, carts, props.grid);
        }
    }

    // p5.draw = () => {
    //     p5.background(222);
    //     p5.normalMaterial();
    //     p5.push();
    //     p5.rotateZ(p5.frameCount * rotation);
    //     p5.rotateX(p5.frameCount * rotation);
    //     p5.rotateY(p5.frameCount * rotation);
    //     p5.box(100);
    //     p5.pop();
    // };

    

};

export default function Background() {
    const [rotation,     setRotation] = useState(0);
    const [carts,           setCarts] = useState([]);
    const [cartCount,   setCartCount] = useState(0);
    const [cartColor,   setCartColor] = useState(0);
    const [maxSpeed,     setMaxSpeed] = useState(0);
    const [minSpeed,     setMinSpeed] = useState(0);
    const [partWidth,   setPartWidth] = useState(0);
    const [partHeight, setPartHeight] = useState(0);
    const [partCount,   setPartCount] = useState(0);
    const [edgeExtend, setEdgeExtend] = useState(0);
    const [dGrid,     setDGrid] = useState(false);

    useEffect(() => {
        setRotation(2);
        const cartCount: number = (Math.floor(Math.random()*500));
        const partCount: number = 3;
        const w: number = 20;
        const h: number = 20;
        var cartColor = getRandomColor();
        const c: Array<CartType> = generateCarts(cartCount, partCount, window.innerWidth, window.innerHeight, cartColor);
        setCarts(c);
        setCartCount(cartCount);
        setCartColor(cartColor);
        setPartWidth(w);
        setPartHeight(h);
        setMaxSpeed(500);
        setMinSpeed(1000);
        setPartCount(partCount);
        setEdgeExtend(w);

        // const interval = setInterval(
        //     () => setRotation(rotation => rotation + 0),
        //     100
        // );
        // return () => {
        //     clearInterval(interval);
        // };
    }, []);

    // console.log(carts);

    
    return (
        <NextReactP5Wrapper sketch={sketch} rotation={rotation} carts={carts} grid={dGrid} />
    )
}