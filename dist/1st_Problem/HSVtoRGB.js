"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HSVtoRGB(hue, saturation, value) {
    const Delta = value * saturation;
    const HPrime = hue / 60;
    const X = Delta * (1 - Math.abs((HPrime % 2) - 1));
    const whenisZero = Number(HPrime >= 0 && HPrime < 1);
    const whenisOne = Number(HPrime >= 1 && HPrime < 2);
    const whenisTwo = Number(HPrime >= 2 && HPrime < 3);
    const whenisThree = Number(HPrime >= 3 && HPrime < 4);
    const whenisFour = Number(HPrime >= 4 && HPrime < 5);
    const whenisFive = Number(HPrime >= 5 && HPrime < 6);
    //Depending in the zone they are, proceed with the operation on the formula
    const rPrime = ((whenisZero + whenisFive) * Delta) + ((whenisOne + whenisFour) * X) + ((whenisTwo + whenisThree) * 0);
    const gPrime = ((whenisOne + whenisTwo) * Delta) + ((whenisZero + whenisThree) * X) + ((whenisFour + whenisFive) * 0);
    const bPrime = ((whenisThree + whenisFour) * Delta) + ((whenisTwo + whenisFive) * X) + ((whenisZero + whenisOne) * 0);
    //adding the same amount to each component, to match value
    const m = value - Delta;
    const red = Math.round((rPrime + m) * 255);
    const green = Math.round((gPrime + m) * 255);
    const blue = Math.round((bPrime + m) * 255);
    return { red, green, blue };
}
function testHsvToRgbConversion() {
    const testColors = [
        { h: 0, s: 1, v: 1 }, // Red
        { h: 120, s: 1, v: 1 }, // Green
        { h: 240, s: 1, v: 1 }, // Blue
        { h: 60, s: 1, v: 1 }, // Yellow
        { h: 300, s: 1, v: 1 }, // Magenta
        { h: 180, s: 1, v: 1 }, // Cyan
        { h: 0, s: 0, v: 1 }, // White
        { h: 0, s: 0, v: 0.5 }, // Gray
        { h: 0, s: 0, v: 0 } // Black
    ];
    testColors.forEach((color) => {
        const rgb = HSVtoRGB(color.h, color.s, color.v);
        console.log(`HSV(${color.h.toFixed(1)}°, ${color.s.toFixed(2)}, ${color.v.toFixed(2)}) → ` +
            `RGB(${rgb.red}, ${rgb.green}, ${rgb.blue})`);
    });
}
testHsvToRgbConversion();
//# sourceMappingURL=HSVtoRGB.js.map