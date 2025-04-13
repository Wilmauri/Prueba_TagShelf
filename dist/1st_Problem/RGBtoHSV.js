"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RGBtoHSV(red, green, blue) {
    const R = red / 255.0;
    const G = green / 255.0;
    const B = blue / 255.0;
    const Cmax = Math.max(R, G, B);
    const Cmin = Math.min(R, G, B);
    const Delta = Cmax - Cmin;
    //When one of these cases matches, use it to get hue (converting to number so we get = 1 true, 0 false)
    const redMax = Number(R >= G && R >= B);
    const greenMax = Number(G > R && G >= B);
    const blueMax = Number(B > R && B > G);
    //Epsilon to avoid division by 0 in the formula of hue and making a safedelta so we do not divide by 0
    const Epsilon = 0.000001;
    const SafeDelta = Delta + Epsilon;
    //Hue calculation
    const baseRed = ((G - B) / SafeDelta);
    const baseGreen = ((B - R) / SafeDelta) + 2;
    const baseBlue = ((R - G) / SafeDelta) + 4;
    //Making sure is in hexagon range
    const hueR = redMax * ((baseRed + 6) % 6);
    const hueG = greenMax * ((baseGreen + 6) % 6);
    const hueB = blueMax * ((baseBlue + 6) % 6);
    //Converting to degrees
    let hue = (hueR + hueG + hueB) * 60;
    //Multiplicating by either 0 (delta <= epsilon) or 1 (Delta > epsilon)
    hue *= Number(Delta > Epsilon);
    //Validating hue in range [0,306]
    hue = (hue + 360) % 360;
    //calculating saturation 
    let saturation = Cmax === 0 ? 0 : Delta / (Cmax + Epsilon * Number(Cmax === 0));
    //Getting value
    let value = Cmax;
    return {
        h: hue,
        s: saturation,
        v: value,
    };
}
function testConversion() {
    const testColors = [
        { red: 255, green: 0, blue: 0 }, // Red
        { red: 0, green: 255, blue: 0 }, // Green
        { red: 0, green: 0, blue: 255 }, // Blue
        { red: 255, green: 255, blue: 0 }, // Yellow
        { red: 255, green: 0, blue: 255 }, // Magenta
        { red: 0, green: 255, blue: 255 }, // Cyan
        { red: 255, green: 255, blue: 255 }, // White
        { red: 128, green: 128, blue: 128 }, // Gray
        { red: 0, green: 0, blue: 0 } // Black
    ];
    testColors.forEach((color) => {
        const hsv = RGBtoHSV(color.red, color.green, color.blue);
        console.log(`RGB(${color.red}, ${color.green}, ${color.blue}) → ` +
            `HSV(${hsv.h.toFixed(1)}°, ${hsv.s.toFixed(2)}, ${hsv.v.toFixed(2)})`);
    });
}
testConversion();
//# sourceMappingURL=RGBtoHSV.js.map