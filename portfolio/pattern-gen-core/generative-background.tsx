import React, { useEffect, useState, useRef, useContext } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type CartType from "../interfaces/cart";
import type PartType from "../interfaces/part";
import type PositionType from "../interfaces/position";
import type Color from "../interfaces/color";
import { ThemeContext } from "../context/context";

type MySketchProps = SketchProps & {
    rotation: number;
    carts: Array<CartType>;
    grid: boolean;
    darkMode: string;
};

//draws grid to the screen
function drawGrid(p5: P5CanvasInstance<MySketchProps>, w:number, h: number) {
    
    p5.push();
    p5.strokeWeight(1);
    p5.stroke(0, 360, 360);

    const xCount = window.innerWidth  / w;
    const yCount = window.innerHeight*7 / h;

    for (let index = 0; index < xCount; index++) {
        let x = index * w;
        p5.line(x, 0, x, window.innerHeight*7);
    }
    for (let index = 0; index < yCount; index++) {
        let y = index * h;
        p5.line(0, y, window.innerWidth, y);
    }
    p5.pop();
}

function drawX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y1, x2, y2);
    p5.line(x1, y2, x2, y1);
}

function drawDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/3;
    const halfHeight= part.height * 1/3;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
}

function drawSmallDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/9;
    const halfHeight= part.height * 1/9;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
}

function drawDiagLeft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y1, x2, y2);
}

function drawDiagRight(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y2, x2, y1);
}

function drawDiagCleft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, x2, y1 - halfHeight);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(xHalf, y2, x1, y2 + halfHeight);
}

function drawLargeBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
}

function drawCross(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, xHalf, y2);
    p5.line(x1, yHalf, x2, yHalf);
}

function drawSmallBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth = part.width * 1/6;
    const quarterHeight= part.height * 1/6;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
}

function drawTripleLinesVertical(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthWidth = part.width   * 1/8;
    const quarterHeight= part.height * 1/4;
    const x1 = part.position.x + cartPosition.x - eighthWidth;
    const x2 = part.position.x + cartPosition.x;
    const x3 = part.position.x + cartPosition.x + eighthWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    p5.line(x1, y1, x1, y2);
    p5.line(x2, y1, x2, y2);
    p5.line(x3, y1, x3, y2);
}

function drawTripleLinesHorizontal(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthHeight = part.height * 1/8;
    const quarterWidth = part.width  * 1/4;
    const y1 = part.position.y + cartPosition.y - eighthHeight;
    const y2 = part.position.y + cartPosition.y;
    const y3 = part.position.y + cartPosition.y + eighthHeight;
    const x1 = cartPosition.x - quarterWidth;
    const x2 = cartPosition.x + quarterWidth;
    p5.line(x1, y1, x2, y1);
    p5.line(x1, y2, x2, y2);
    p5.line(x1, y3, x2, y3);

}

function drawDot(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse((cartPosition.x + part.position.x), cartPosition.y, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawXDot1(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height;
    const quarterWidth  = part.width;
    const y2 = cartPosition.y  + quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x2, y2, (part.width * 1/64), (part.width * 1/64));
    p5.pop();
}

function drawXDot2(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/2;
    const quarterWidth  = part.width  * 1/2;
    const y1 = cartPosition.y  - quarterHeight;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y1, (part.width * 1/20), (part.width * 1/20));
    p5.pop();
}

function drawXDot3(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height;
    const quarterWidth  = part.width;
    const y2 = cartPosition.y  + quarterHeight;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y2, (part.width * 1/8), (part.width * 1/8));
    p5.pop();
}

function drawXDot4(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height;
    const quarterWidth  = part.width;
    const y1 = cartPosition.y  - quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x2, y1, (part.width * 1/16), (part.width * 1/16));
    p5.pop();
}

function drawDoubleVerticalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/6;
    const x = part.position.x + cartPosition.x;
    const y1 = cartPosition.y  - quarterHeight*2;
    const y2 = cartPosition.y  - quarterHeight*2;
    const y3 = cartPosition.y  + quarterHeight*3;
    const y4 = cartPosition.y  + quarterHeight*3;
    const rand: number = Math.random();
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x, y1, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x, y2, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawDoubleHorizontalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth  = part.width  * 1/6;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    const y = cartPosition.y;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x2, y, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawSmallCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/3), 
               (part.width * 1/3))
}

function drawLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/2), 
               (part.width * 1/2))

}

function drawExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/3), 
               (part.width * 1/3))

}

function drawSuperExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 3), 
               (part.width * 3))
}

function drawSmallBoxCross(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawSmallBox(p5, cartPosition, part);
    drawCross(p5, cartPosition, part);
}

function drawCircleDot(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawSmallCircle(p5, cartPosition, part);
    drawDot(p5, cartPosition, part);
}

function drawSmallBoxX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawSmallBox(p5, cartPosition, part);
    drawX(p5, cartPosition, part);
}

function drawLargeBoxX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawLargeBox(p5, cartPosition, part);
    drawX(p5, cartPosition, part);
}

function drawCrossDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawDoubleVerticalDots(p5, cartPosition, part);
    drawDoubleHorizontalDots(p5, cartPosition, part);
}

function drawBackgroundGradient(p5: P5CanvasInstance<MySketchProps>, orbX: number, orbY: number, theme: string, totalHeight: number, section: number) {
    p5.push()
    let gradient = p5.drawingContext.createRadialGradient(orbX, orbY, 15, orbX, orbY, window.innerWidth);
   
    if(section == 0) {
        gradient.addColorStop(.5, p5.color(140, 360, 200));
        gradient.addColorStop(1, p5.color(180, 360, 70));
    } else if(section == 1) {
        gradient.addColorStop(0, p5.color(20, 300, 360));
        gradient.addColorStop(1, p5.color(20, 360, 360));
    } else if(section == 2) {
        gradient.addColorStop(0, p5.color(40, 300, 360));
        gradient.addColorStop(1, p5.color(40, 360, 360));
    } else if(section == 3) {
        gradient.addColorStop(0, p5.color(60, 300, 360));
        gradient.addColorStop(1, p5.color(60, 360, 360));
    } else {
        gradient.addColorStop(0, p5.color(180, 300, 360));
        gradient.addColorStop(.5, p5.color(180, 360, 360));
    }
    
    
    p5.drawingContext.fillStyle = gradient;
    p5.noStroke();
    p5.rect(0, 0, window.innerWidth, totalHeight);
    p5.pop();
}

function drawOrb(p5: P5CanvasInstance<MySketchProps>, orbX: number, orbY: number, darkMode: boolean) {

    let glowGradient = p5.drawingContext.createRadialGradient(orbX, orbY, 15, orbX, orbY, 100);
    let orbGradient = p5.drawingContext.createRadialGradient(orbX, orbY, 0, orbX, orbY, 20);

    if(darkMode) {
        glowGradient.addColorStop(0, p5.color(35, 360, 360, 100));
        glowGradient.addColorStop(1, p5.color(25, 360, 360, 0));
        orbGradient.addColorStop( .1, p5.color(35,  10, 360));
        orbGradient.addColorStop(.85, p5.color(40, 270, 360));
        orbGradient.addColorStop(1, p5.color(25, 360, 340));
    } else {
        glowGradient.addColorStop(0, p5.color(160, 360, 360, 100));
        glowGradient.addColorStop(1, p5.color(160, 360, 360, 0));
        orbGradient.addColorStop( .1, p5.color(0,  0, 0));
        orbGradient.addColorStop(.75, p5.color(0, 0, 0));
        orbGradient.addColorStop(.9, p5.color(160, 360, 200));
        orbGradient.addColorStop(1, p5.color(160, 360, 360));
    }

    p5.push();
    p5.noStroke()
    p5.drawingContext.fillStyle = glowGradient;
    p5.ellipse(orbX, orbY, 100);
    p5.pop();
    p5.push();
    p5.noStroke()
    p5.drawingContext.fillStyle = orbGradient;
    p5.ellipse(orbX, orbY, 20);
    p5.pop()
    
}

function drawText(layer, props) {

    if(props.theme == "dark") {
        layer.fill(360, 360, 0);
    } else {
        layer.fill('#f4f4f5'); 
    }
    layer.noStroke();
    layer.erase(360, 360);
    layer.rect(0, 145, window.innerWidth-15, 360);
    layer.noErase(360, 360);
    layer.rect(5, 155, window.innerWidth-25, 340);
    layer.textSize(layer.width/8);
    layer.erase(360, 360);
    layer.text('JAMES COVERT', (layer.width-35)/2, 380);
    layer.textSize(layer.width/30);
    layer.text('SOFTWARE ENGINEER // FULL STACK // WEB DEV', (layer.width-35)/2, 470);

}

function drawCarts(layer, props){

    const { carts, grid, section } = props;

    if (grid) {
        drawGrid(layer, carts[0].width, carts[0].height);
    }
    
    if(props.theme == "dark") {
        layer.background(360, 360, 0);
    } else {
        layer.background('#f4f4f5'); 
    }
    layer.strokeWeight(10);
    layer.stroke(360);
    layer.noFill();
    layer.erase(360, 360);
    for (let i = 0; i < carts.length; i++) {
        var c = carts[i];
        if(c == undefined) break;
        for (let j = 0; j < c.parts.length; j++) {
            var p = c.parts[j];
            
            switch (p.shape) {
                case "X":                      drawX(layer, c.position, p);
                    break;
                case "DIAMOND":                drawDiamond(layer, c.position, p);
                    break;
                case "DIAG-LEFT":              drawDiagLeft(layer, c.position, p);
                    break;
                case "DIAG-RIGHT":             drawDiagRight(layer, c.position, p);
                    break;
                case "BOX-SM":                 drawSmallBox(layer, c.position, p);
                    break;
                case "BOX-LG":                 drawLargeBox(layer, c.position, p);
                    break;
                case "BOX-SM-X":               drawSmallBoxX(layer, c.position, p);
                    break;
                case "BOX-LG-X":               drawLargeBoxX(layer, c.position, p);
                    break;
                case "CIRCLE-SM":              drawSmallCircle(layer, c.position, p);
                    break;
                case "CIRCLE-DOT":             drawCircleDot(layer, c.position, p);
                    break;
                case "CIRCLE-LG":              drawLargeCircle(layer, c.position, p);
                    break;
                case "DOT":                    drawDot(layer, c.position, p);
                    break;
                case "CROSS":                  drawCross(layer, c.position, p);
                    break;
                case "BOX-CROSS":              drawSmallBoxCross(layer, c.position, p);
                    break;
                case "DOUBLE-DOT-HORIZONTAL":  drawDoubleHorizontalDots(layer, c.position, p);
                    break;
                case "DOUBLE-DOT-VERTICAL":    drawDoubleVerticalDots(layer, c.position, p);
                    break;
                case "QUAD-DOT-CROSS":         drawCrossDots(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-1":           drawXDot1(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-2":           drawXDot2(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-3":           drawXDot3(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-4":           drawXDot4(layer, c.position, p);
                    break;
                case "THREE-LINES-VERTICAL":   drawTripleLinesVertical(layer, c.position, p);
                    break;
                case "THREE-LINES-HORIZONTAL": drawTripleLinesHorizontal(layer, c.position, p);
                    break;
                case "SMALL-DIAMOND":          drawSmallDiamond(layer, c.position, p);
                    break;
                case "DIAG-CLEFT":             drawDiagCleft(layer, c.position, p);
                    break;
                case "EXTRA-LG-CIRCLE":        drawExtraLargeCircle(layer, c.position, p);
                    break;
                case "SUPER-EXTRA-LG-CIRCLE":  drawSuperExtraLargeCircle(layer, c.position, p);
                    break;
                default: drawX(layer, c.position, p);
            }
        }
    }



    
    layer.ellipse(layer.width/2 -150, 250, 50);
    layer.ellipse(20, 500, 75);
    layer.ellipse(250, 250, 50);
    layer.ellipse(layer.width-50, 500, 150);
    layer.ellipse(layer.width-250, 500, 75);
    layer.noErase();
    layer.push();
    layer.noStroke();
    layer.rect(0, 250, window.innerWidth-20, 250);
    if(props.theme == "dark") {
        layer.fill(360, 360, 0);
    } else {
        layer.fill('#f4f4f5');
    }
    
    layer.ellipse((layer.width-10)/2, 250, 150);
    layer.pop();
    layer.erase(360, 360);
    layer.ellipse((layer.width-10)/2, 250, 150);
    
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition(minW: number, maxW: number, minH: number, maxH: number, w: number, h: number) {
    const colCount = maxW / w;
    const rowCount = maxH / h;
    const x = getRandomInt(minW, colCount) * w;
    const y = getRandomInt(minH, rowCount) * h;
    var p: PositionType = {
        x: x,
        y: y
    }
    return p;
}

function getRandomDirection() {
    const dir = getRandomInt(0,7);
    switch(dir) {
        case 0:  return "EAST";
        case 1:  return "WEST";
        default: return "NORTH"
    }
}

function getRandomColor() {
    const color = getRandomInt(0, 4);
    switch(color) {
        case 0:  return 131;
        case 1:  return 21;
        case 2:  return 145;
        case 3:  return 131;
        default: return 0;
    }
}

function getRandomContainerPosition(partW: number, partH: number, cartPosition: PositionType) {
    const colCount = window.innerWidth /  partW;
    const selection = getRandomInt(0, 3);
    var partX: number;
    switch(selection) {
        case 0:  partX = (partW * 1/2)  + cartPosition.x;
            break;
        case 1:  partX = cartPosition.x;
            break;
        case 2:  partX = (partW * -1/2) + cartPosition.x;
            break;
        default: partX = cartPosition.x;
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomPartShape() {
    const selection = getRandomInt(0, 25);
     switch(selection) {
        case 0: return  "BOX-LG";
        case 1: return  "BOX-SM";
        case 2: return  "CIRCLE-SM";
        case 3: return  "CIRCLE-LG";
        case 4: return  "CIRCLE-DOT";
        case 5: return  "BOX-SM-X";
        case 6: return  "DOUBLE-DOT-HORIZONTAL";
        case 7: return  "DOUBLE-DOT-VERTICAL";
        case 8: return  "QUAD-DOT-CROSS";
        case 9: return  "QUAD-DOT-X-1";
        case 10: return "DOT";
        case 11: return "CROSS";
        case 12: return "THREE-LINES-VERTICAL";
        case 13: return "THREE-LINES-HORIZONTAL";
        case 14: return "X";
        case 15: return "DIAG-LEFT";
        case 16: return "DIAG-RIGHT";
        case 17: return "DIAMOND";
        case 18: return "BOX-LG-X";
        case 19: return "BOX-CROSS";
        case 20: return "SMALL-DIAMOND";
        case 21: return "DIAG-CLEFT";
        case 22: return  "QUAD-DOT-X-2";
        case 23: return  "QUAD-DOT-X-3";
        case 24: return  "QUAD-DOT-X-4";
        default: return "X"
     }
}

function changeCartColor(cart: CartType, h: number, s: number, b: number, bw: number) {
    for (let index = 0; index < cart.parts.length; index++) {
        cart.parts[index].color.h  = h;
        cart.parts[index].color.s  = s;
        cart.parts[index].color.b  = b;
        cart.parts[index].color.a = bw;
    }
}

function moveCart(cart: CartType, edgeExtend: number, continuation: number, height: number) {
    if (cart.isTransitioning) {
        if (cart.transitionCount >= ((cart.width / 2) - 2)) {
            cart.isTransitioning = false;
        } else {
            cart.transitionCount++;
        }
    } else {
        cart.isTransitioning = true;
        cart.transitionCount = 0;
        cart.age = 0;
        cart.direction = getRandomDirection();
    }

    switch (cart.direction) {
        case "NORTH": changeCartColor(cart, 160, 360, 360, 100);
                        cart.position.y = cart.position.y - 2;
                        break;
        case "SOUTH": changeCartColor(cart, 40, 360, 360, 100);
                        cart.position.y = cart.position.y + 2;
                        break;
        case  "EAST": changeCartColor(cart, 30, 360, 360, 100);
                        cart.position.x = cart.position.x + 2;
                        break;
        case  "WEST": changeCartColor(cart, 165, 360, 360, 100);
                        cart.position.x = cart.position.x - 2;
                        break;
        default: (console.error('Failed to move cart'));
    }
    
    if (cart.position.x > (window.innerWidth + cart.width + edgeExtend)) {
        cart.position.x = 0 - cart.width;
        cart.position.y = cart.position.y + cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.x < 0 - cart.width - edgeExtend) {
        cart.position.x = window.innerWidth + cart.width - (window.innerWidth % cart.width);
        cart.position.y = cart.position.y - cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y > (height + cart.height + edgeExtend)) {
        cart.position.y = 0 - cart.height;
        cart.position.x = cart.position.x + cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y < 0 - cart.height - edgeExtend) {
        cart.position.y = height + cart.height - (height % cart.height);
        cart.position.x = cart.position.x - cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }

    if (!cart.isTransitioning &&
        (cart.transitionCount == (cart.width / 2) - 2) &&
        (getRandomInt(0, 100) < continuation)) {
            cart.isTransitioning = true;
            cart.transitionCount = -1;
        }
    return cart;
}

function buildNewPart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = getRandomPartShape();
    var position: PositionType = getRandomContainerPosition(partW, partH, cartPosition);

    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: partW,
        height: partH
    };
    return p;
}

function buildRandomExtraLargePart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = "EXTRA-LG-CIRCLE";
    var position: PositionType = getRandomContainerPosition(partW, partH, cartPosition);
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: partW,
        height: partH
    };
    return p;
}

function buildRandomSuperExtraLargePart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = "SUPER-EXTRA-LG-CIRCLE";
    var position: PositionType = {x: window.innerWidth/2, y: window.innerHeight*7}
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: 700,
        height: 700
    };
    return p;
}

// generates a give number of uniques carts
function generateCarts(cartCount: number, partCount: number, w: number, h: number, minSpeed: number, maxSpeed: number, totalHeight: number) {
    
    let carts = new Array(cartCount);
    for (let i = 0; i < cartCount; i++) {
        var cartColor: Color = {h: 140, s: 300, b: 270, a: 100};
        var cartPosition: PositionType = getRandomPosition(0, window.innerWidth, 0, totalHeight, w, h);
        var parts = new Array(getRandomInt(0, partCount) + 1);

        var width, height;


        for (let j = 0; j < partCount; j++) {
            const randomNum = Math.random();
            if(randomNum < 1/5) {
                width = w;
                height = h;
            } else if(randomNum < 2/5) {
                width = w/2;
                height = h/2;
            } else if(randomNum < 3/5) {
                width = w/3;
                height = h/3;
            } else if(randomNum < 4/5) {
                width = w*2;
                height = h*2;
            }else {
                width = w*3;
                height = h*3;
            }
            parts[j] = buildNewPart(cartPosition, cartColor, width, height);
        }
        const speed = getRandomInt(minSpeed, maxSpeed);
        var cart: CartType = {
            id: i,
            position: cartPosition,
            age: getRandomInt(minSpeed/2, maxSpeed/2),
            height: w,
            width: h,
            isTransitioning: false,
            transitionCount: 0,
            parts: parts,
            speed: speed,
            direction: getRandomDirection()
        }
        carts[i] = cart;
    }
    return carts;
}

function backgroundSketch(p5: P5CanvasInstance<MySketchProps>) {
    let state = {
        carts: [],
        grid: false,
        orbX: window.innerWidth/2,
        orbY: window.innerHeight/2,
        orbBounce: Math.PI,
        theme: "dark",
        scrollYPosition: 0,
        totalHeight: window.innerHeight*7,
        section: 0
    }
    var canvas, cartLayer, font;

    p5.preload = () => {
        // font = p5.loadFont('assets/fonts/WastedPersonalUseRegular-WyegG.ttf');
        font = p5.loadFont('assets/fonts/QuartzoBold-W9lv.ttf');
        // font = p5.loadFont('assets/fonts/MadHacker-Yjz8.ttf');

        
        
    }
    
    p5.setup = () => {
        canvas = p5.createCanvas(p5.windowWidth, state.totalHeight, p5.P2D);
        canvas.position(0,0);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
        cartLayer = p5.createGraphics(window.innerWidth, state.totalHeight)
        cartLayer.textFont(font);
        cartLayer.textAlign(cartLayer.CENTER);
        cartLayer.position(0,0);
        cartLayer.colorMode(p5.HSB, 360)
        cartLayer.strokeWeight(3);
        cartLayer.ellipseMode(p5.RADIUS);

    }

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, state.totalHeight);
        cartLayer = p5.createGraphics(window.innerWidth, state.totalHeight);
        cartLayer.textFont(font);
        cartLayer.textAlign(cartLayer.CENTER);
        cartLayer.position(0,0);
        cartLayer.colorMode(p5.HSB, 360)
        cartLayer.strokeWeight(3);
        cartLayer.ellipseMode(p5.RADIUS);
        state.orbX = window.innerWidth/2;
        state.orbY = window.innerHeight/2 + state.scrollYPosition;
        state.orbBounce = Math.PI;
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
        if(canvas != undefined && state.totalHeight != canvas.height){
            p5.resizeCanvas(p5.windowWidth, state.totalHeight);
        }
        if(cartLayer != undefined && state.totalHeight != cartLayer.height){
            cartLayer = p5.createGraphics(window.innerWidth, state.totalHeight);
            cartLayer.textFont(font);
            cartLayer.textAlign(cartLayer.CENTER);
            cartLayer.position(0,0);
            cartLayer.colorMode(p5.HSB, 360)
            cartLayer.strokeWeight(3);
            cartLayer.ellipseMode(p5.RADIUS);
        }
    }

    function drawAll() {

        return () => {

            state.orbBounce = state.orbBounce + Math.PI/500;
            state.orbX = state.orbX + p5.sin(state.orbBounce/2)*4;
            state.orbY = state.orbY + p5.cos(state.orbBounce)*2;
            
            
            drawBackgroundGradient(p5, state.orbX, state.orbY + state.scrollYPosition, state.theme, state.totalHeight, state.section);
            drawCarts(cartLayer, state);
            drawText(cartLayer, state);
            p5.image(cartLayer, 0, 0);

            // if(state.theme == 'dark') {
            //     drawOrb(p5, state.orbX, state.orbY+ state.scrollYPosition, state.darkMode);
            // } 
        }
    }

    p5.draw = drawAll();
};

type BackgroundProps = {
    scrollYPosition: number;
    height: number;
    section: number;
}

export default function Background({scrollYPosition, height, section}: BackgroundProps) {
    const [rotation,       setRotation] = useState(0);
    const [cartCount,     setCartCount] = useState(100);
    const [carts,             setCarts] = useState(Array<CartType>(cartCount));
    const [maxSpeed,       setMaxSpeed] = useState(5000);
    const [minSpeed,       setMinSpeed] = useState(10000);
    const [partWidth,     setPartWidth] = useState(500);
    const [partHeight,   setPartHeight] = useState(500);
    const [partCount,     setPartCount] = useState(1);
    const [edgeExtend,   setEdgeExtend] = useState(0);
    const [dGrid,             setDGrid] = useState(false);
    const [continuation,   setContinue] = useState(20);
    const [orbX,               setOrbX] = useState(0);
    const [orbY,               setOrbY] = useState(0);
    const [orbBounce,     setOrbBounce] = useState(0);
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        const c: Array<CartType> = generateCarts(cartCount, partCount, partWidth, partHeight, minSpeed, maxSpeed, height);
        setCarts(c);
        
        if(partWidth > partHeight) {
            setEdgeExtend(partWidth*3);
        } else {
            setEdgeExtend(partHeight*3);
        }
        setOrbX(window.innerWidth/2);
        setOrbY(window.innerHeight/2)
        
        const interval = setInterval(() => {
            setCarts(carts => {
                let cts = new Array<CartType>(carts.length);
                for (let i = 0; i < carts.length; i++) {
                    cts[i] = carts[i];
                    if (cts[i].isTransitioning || cts[i].age >= cts[i].speed) {
                        moveCart(cts[i], edgeExtend, continuation, height);
                    } else {
                        cts[i].age++;
                    }
                }
                    return cts;
                })
            }, 10);
            return () => {
                clearInterval(interval);
            };
        }, [dGrid, height]);

    return (

        <NextReactP5Wrapper sketch={backgroundSketch} 
                            rotation={rotation} 
                            carts={carts} 
                            grid={dGrid} 
                            theme={theme} 
                            scrollYPosition={scrollYPosition} 
                            totalHeight={height}
                            section={section}/>
  
    )
}