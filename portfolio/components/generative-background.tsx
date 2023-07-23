import React, { useEffect, useState, useRef } from "react";
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
function drawGrid(p5: P5CanvasInstance<MySketchProps>, w:number, h: number) {
    
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

function drawX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/4;
    const halfHeight= part.height * 1/4;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y1, x2, y2);
    p5.line(x1, y2, x2, y1);
    p5.pop();
}

function drawDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
    p5.pop();
}

function drawSmallDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/4;
    const halfHeight= part.height * 1/4;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
    p5.pop();
}

function drawDiagLeft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y1, x2, y2);
    p5.pop();
}

function drawDiagRight(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y2, x2, y1);
    p5.pop();
}

function drawDiagCleft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 1/8;
    const halfHeight= part.height * 1/8;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
    p5.pop();
}

function drawLargeBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
    p5.pop();
}

function drawCross(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/3;
    const halfHeight= part.height * 1/3;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(xHalf, y1, xHalf, y2);
    p5.line(x1, yHalf, x2, yHalf);
    p5.pop();
}

function drawSmallBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth = part.width * 1/4;
    const quarterHeight= part.height * 1/4;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
    p5.pop();
}

function drawTripleLinesVertical(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthWidth = part.width   * 1/8;
    const quarterHeight= part.height * 1/4;
    const x1 = part.position.x + cartPosition.x - eighthWidth;
    const x2 = part.position.x + cartPosition.x;
    const x3 = part.position.x + cartPosition.x + eighthWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y1, x1, y2);
    p5.line(x2, y1, x2, y2);
    p5.line(x3, y1, x3, y2);
    p5.pop();
}

function drawTripleLinesHorizontal(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthHeight = part.height * 1/8;
    const quarterWidth = part.width  * 1/4;
    const y1 = part.position.y + cartPosition.y - eighthHeight;
    const y2 = part.position.y + cartPosition.y;
    const y3 = part.position.y + cartPosition.y + eighthHeight;
    const x1 = cartPosition.x - quarterWidth;
    const x2 = cartPosition.x + quarterWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.line(x1, y1, x2, y1);
    p5.line(x1, y2, x2, y2);
    p5.line(x1, y3, x2, y3);
    p5.pop();
}

function drawDot(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.fill(part.color, 360, 360)
    p5.ellipse((cartPosition.x + part.position.x), cartPosition.y, (part.width * 1/32), (part.width * 1/32))
    p5.pop();
}

function drawXDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 0.25;
    const quarterWidth  = part.width  * 0.25;
    const y1 = cartPosition.y  - quarterHeight;
    const y2 = cartPosition.y  + quarterHeight;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.fill(part.color, 360, 360);
    p5.ellipse(x1, y1, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x1, y2, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x2, y1, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x2, y2, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawDoubleVerticalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/8;
    const x = part.position.x + cartPosition.x;
    const y1 = cartPosition.y  - quarterHeight;
    const y2 = cartPosition.y  + quarterHeight;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.fill(part.color, 360, 360);
    p5.ellipse(x, y1, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x, y2, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawDoubleHorizontalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth  = part.width  * 1/8;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    const y = cartPosition.y;
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.fill(part.color, 360, 360);
    p5.ellipse(x1, y, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x2, y, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawSmallCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.noFill();
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 0.25), 
               (part.width * 0.25))
    p5.pop();
}

function drawLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.noFill();
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/3), 
               (part.width * 1/3))
    p5.pop();
}

function drawExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color, 360, 360);
    p5.noFill();
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1.25), 
               (part.width * 1.25))
    p5.pop();
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

function drawCarts(p5: P5CanvasInstance<MySketchProps>, props){

   return () => {
        const { carts, grid} = props;
        p5.clear();
        p5.background(30, 30, 70)
        if (grid) {
            drawGrid(p5, carts[0].width, carts[0].height);
        }
        p5.push();
        p5.strokeWeight(5);
        p5.stroke(155, 360, 0)
        p5.fill(0, 360, 360);
        for (let i = 0; i < carts.length; i++) {
            var c = carts[i];

            for (let j = 0; j < c.parts.length; j++) {
                var p = c.parts[j];

                switch (p.shape) {
                    case "X":                      drawX(p5, c.position, p);
                        break;
                    case "DIAMOND":                drawDiamond(p5, c.position, p);
                        break;
                    case "DIAG-LEFT":              drawDiagLeft(p5, c.position, p);
                        break;
                    case "DIAG-RIGHT":             drawDiagRight(p5, c.position, p);
                        break;
                    case "BOX-SM":                 drawSmallBox(p5, c.position, p);
                        break;
                    case "BOX-LG":                 drawLargeBox(p5, c.position, p);
                        break;
                    case "BOX-SM-X":               drawSmallBoxX(p5, c.position, p);
                        break;
                    case "BOX-LG-X":               drawLargeBoxX(p5, c.position, p);
                        break;
                    case "CIRCLE-SM":              drawSmallCircle(p5, c.position, p);
                        break;
                    case "CIRCLE-DOT":             drawCircleDot(p5, c.position, p);
                        break;
                    case "CIRCLE-LG":              drawLargeCircle(p5, c.position, p);
                        break;
                    case "DOT":                    drawDot(p5, c.position, p);
                        break;
                    case "CROSS":                  drawCross(p5, c.position, p);
                        break;
                    case "BOX-CROSS":              drawSmallBoxCross(p5, c.position, p);
                        break;
                    case "DOUBLE-DOT-HORIZONTAL":  drawDoubleHorizontalDots(p5, c.position, p);
                        break;
                    case "DOUBLE-DOT-VERTICAL":    drawDoubleVerticalDots(p5, c.position, p);
                        break;
                    case "QUAD-DOT-CROSS":         drawCrossDots(p5, c.position, p);
                        break;
                    case "QUAD-DOT-X":             drawXDots(p5, c.position, p);
                        break;
                    case "THREE-LINES-VERTICAL":   drawTripleLinesVertical(p5, c.position, p);
                        break;
                    case "THREE-LINES-HORIZONTAL": drawTripleLinesHorizontal(p5, c.position, p);
                        break;
                    case "SMALL-DIAMOND":          drawSmallDiamond(p5, c.position, p);
                        break;
                    case "DIAG-CLEFT":             drawDiagCleft(p5, c.position, p);
                        break;
                    default: drawX(p5, c.position, p);
                }
                
            }
        }
        p5.pop();
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition(minW: number, maxW: number, minH: number, maxH: number, w: number, h: number) {
    const colCount = maxW / w;
    const rowCount = maxH / h;
    const x = getRandomInt(minW, rowCount) * w;
    const y = getRandomInt(minH, colCount) * h;
    var p: PositionType = {
        x: x,
        y: y
    }
    return p;
}

function getRandomDirection() {
    const dir = getRandomInt(0, 15);
    switch(dir) {
        case 0:  return "NORTH";
        case 1:  return "NORTH";
        // case 2:  return "EAST";
        // case 3:  return "EAST";
        default: return "EAST"
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
        case 0:  partX = (partW * 0.5)  + cartPosition.x;
            break;
        case 1:  partX = cartPosition.x;
            break;
        case 2:  partX = (partW * -0.5) + cartPosition.x;
            break;
        default: partX = cartPosition.x;
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomAccentPosition(partW: number, partH: number, cartPosition: PositionType) {
    const selection = getRandomInt(0, 8);
    var partX: number;
    switch(selection) {
        case 0:  partX = partW * 0.125  + cartPosition.x;
            break;
        case 1:  partX = partW * 0.25   + cartPosition.x;
            break;
        case 2:  partX = partW * 0.5    + cartPosition.x;
            break;
        case 3:  partX = partW + cartPosition.x;
            break;
        case 4:  partX = partW - cartPosition.x;;
            break;
        case 5:  partX = partW * -0.5   + cartPosition.x;
            break;
        case 6:  partX = partW * -0.25  + cartPosition.x;
            break;
        case 7:  partX = partW * -0.125 + cartPosition.x;
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
    const selection = getRandomInt(0, 22);
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
        case 9: return  "QUAD-DOT-X";
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
        default: return "X"
     }
}

function changeCartColor(cart: CartType, color: number) {
    for (let index = 0; index < cart.parts.length; index++) {
        cart.parts[index].color = color;
    }
}

function moveCart(cart: CartType, edgeExtend: number, continuation: number) {
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
        case "NORTH": changeCartColor(cart, 165);
                        cart.position.y = cart.position.y - 2;
                        break;
        case "SOUTH": changeCartColor(cart, 23);
                        cart.position.y = cart.position.y + 2;
                        break;
        case  "EAST": changeCartColor(cart, 30);
                        cart.position.x = cart.position.x + 2;
                        break;
        case  "WEST": changeCartColor(cart, 0);
                        cart.position.x = cart.position.x - 2;
                        break;
        default: (console.error('Failed to move cart'));
    }
    
    if (cart.position.x > (window.innerWidth + cart.width*2)) {
        cart.position.x = 0 - cart.width*2;
        cart.position.y = cart.position.y + cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.x < 0 - cart.width*2) {
        cart.position.x = (window.innerWidth + cart.width*2);
        cart.position.y = cart.position.y - cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y > (window.innerHeight + cart.height*2)) {
        cart.position.y = 0 - cart.height*2;
        cart.position.x = cart.position.x + cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y < 0 - cart.height*2) {
        cart.position.y = (window.innerHeight + cart.height*2);
        cart.position.x = cart.position.x - cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }

    if (!cart.isTransitioning &&
        (cart.transitionCount == (cart.width / 2) - 2) &&
        (getRandomInt(0, 5) < continuation)) {
            cart.isTransitioning = true;
            cart.transitionCount = -1;
        }
    return cart;
}

function buildNewPart(cartPosition: PositionType, color: number, partW: number, partH: number) {
    var shape: string = getRandomPartShape();
    var position: PositionType;

    if (shape == "BOX-LG"     ||
        shape == "BOX-SM"     ||
        shape == "CIRCLE-SM"  ||
        shape == "CIRCLE-LG"  ||
        shape == "CIRCLE-DOT" ||
        shape == "BOX-SM-X"   ||
        shape == "BOX-LG-X"   ||
        shape == "X"          ||
        shape == "DIAG-LEFT"  ||
        shape == "DIAG-RIGHT" ||
        shape == "BOX-CROSS"  ||
        shape == "DIAMOND") {
            position = getRandomContainerPosition(partW, partH, cartPosition)
        } else {
            position = getRandomAccentPosition(partW, partH, cartPosition);
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

function buildRandomEtraLargePart(cartPosition: PositionType, color: number, partW: number, partH: number) {
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

// generates a give number of uniques carts
function generateCarts(cartCount: number, partCount: number, w: number, h: number, cartColor: number) {
    let carts = new Array(cartCount);

    for (let i = 0; i < cartCount; i++) {
        var cartPosition: PositionType = getRandomPosition(0, window.innerWidth, 0, window.innerHeight, w, h);
        var parts = new Array(partCount);
        for (let j = 0; j < partCount; j++) {
            if (j == partCount - 1 && i == cartCount - 1) {
                parts[j] = buildRandomEtraLargePart(cartPosition, cartColor, w, h);
            } else {
                parts[j] = buildNewPart(cartPosition, cartColor, w, h);
            }
        }
        const speed = getRandomInt(3000, 10000);
        var cart: CartType = {
            id: i,
            position: cartPosition,
            age: getRandomInt(3000, speed),
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

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    let state = {
        carts: [],
        grid: false
    }
    var canvas;

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.setup = () => {
        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.P2D);
        canvas.position(0,0);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
    }

    p5.draw = drawCarts(p5, state);
};

export default function Background() {
    const [rotation,     setRotation] = useState(0);
    const [cartCount,   setCartCount] = useState(250);
    const [carts,           setCarts] = useState(Array<CartType>(cartCount));
    const [cartColor,   setCartColor] = useState(0);
    const [maxSpeed,     setMaxSpeed] = useState(0);
    const [minSpeed,     setMinSpeed] = useState(0);
    const [partWidth,   setPartWidth] = useState(0);
    const [partHeight, setPartHeight] = useState(0);
    const [partCount,   setPartCount] = useState(0);
    const [edgeExtend, setEdgeExtend] = useState(0);
    const [dGrid,           setDGrid] = useState(false);
    const [continuation, setContinue] = useState(2);

    useEffect(() => {
        setRotation(2);
        // const cartCount: number = (Math.floor(Math.random()*500));
        const partCount: number = 2;
        const w: number = 130;
        const h: number = 130;
        var cartColor = 25; //getRandomColor();
        const c: Array<CartType> = generateCarts(cartCount, partCount, w, h, cartColor);
        setCarts(c);
        setCartCount(cartCount);
        setCartColor(cartColor);
        setPartWidth(w);
        setPartHeight(h);
        setMaxSpeed(500);
        setMinSpeed(5000);
        setPartCount(partCount);
        setEdgeExtend(w);

        const interval = setInterval(() => setCarts(carts => {
            let cts = new Array<CartType>(carts.length);
            for (let i = 0; i < carts.length; i++) {
                cts[i] = carts[i];
                if (carts[i].isTransitioning || carts[i].age >= carts[i].speed) {
                    cts[i] = moveCart(carts[i], edgeExtend, continuation);
                } else {
                    cts[i].age++;
                    for (let j = 0; j < carts[i].parts.length; j++) {
                        if (!cts[i].isTransitioning){
                            if (carts[i].parts[j].color == 165) {
                                cts[i].parts[j].color = carts[i].parts[j].color = 30;
                            }
                            if (carts[i].parts[j].color > 0) {
                                cts[i].parts[j].color = carts[i].parts[j].color - 1/8;
                            }
                        }
                    }
                }
            }
            return cts;
            }),
            10);
            return () => {
                clearInterval(interval);
            };
        }, [dGrid]);

    return (
        <NextReactP5Wrapper sketch={sketch} rotation={rotation} carts={carts} grid={dGrid} />
    )
}