function RGBtoHSV(red: number, green: number, blue: number): {h: number, s: number, v: number} {
    const R = red / 255.0;
    const G = green / 255.0;
    const B = blue / 255.0;
    const Cmax = Math.max(R, G, B);
    const Cmin = Math.min(R, G, B);
    const Delta = Cmax - Cmin;

    //When one of these cases matches, use it to get hue (converting to number so we get = 1 true, 0 false)
    const redMax = Number(R >= G && R >= B);
    const greenMax = Number(G >  R && G >= B);
    const blueMax = Number(B >  R && B >  G);

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
    let saturation = Cmax === 0 ? 0 : Delta / (Cmax + Epsilon * Number(Cmax === 0)) 
    //Getting value
    let value = Cmax;
    return {
        h: hue,
        s: saturation,
        v: value,
    };
}

//Text case
interface RGB {
    r: number;
    g: number;
    b: number;
  }
  
  interface HSV {
    h: number;
    s: number;
    v: number;
  }
  
  function testConversion(): void {
    const testColors: RGB[] = [
      { r: 255, g: 0, b: 0 },     // Red
      { r: 0, g: 255, b: 0 },     // Green
      { r: 0, g: 0, b: 255 },     // Blue
      { r: 255, g: 255, b: 0 },   // Yellow
      { r: 255, g: 0, b: 255 },   // Magenta
      { r: 0, g: 255, b: 255 },   // Cyan
      { r: 255, g: 255, b: 255 }, // White
      { r: 128, g: 128, b: 128 }, // Gray
      { r: 0, g: 0, b: 0 }        // Black
    ];
    
    testColors.forEach((color: RGB) => {
      const hsv: HSV = RGBtoHSV(color.r, color.g, color.b);
      console.log(
        `RGB(${color.r}, ${color.g}, ${color.b}) → ` +
        `HSV(${hsv.h.toFixed(1)}°, ${hsv.s.toFixed(2)}, ${hsv.v.toFixed(2)})`
      );
    });
  }
  testConversion();