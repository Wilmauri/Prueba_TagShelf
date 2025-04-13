function DATASET(row: number, column: number): number {
    const increaseRow = ((row % 4) % 2) * 4;
    const blockSmallPattern = Math.floor((row / 4) % 4) * 0x08;
    const blockPatternLarge = Math.floor(row / 16) * 0x10;
    const patternColumn = column % 8;

    // Valores de columna (patrón: [1, 0, 1, 2, 3, 2, 3, 0])
    const columnValues = [1, 0, 1, 2, 3, 2, 3, 0];
    const columnValue = columnValues[patternColumn];

    return blockSmallPattern + blockPatternLarge + increaseRow + columnValue;
}
//test cases
console.log(`Valor en (0,0): 0x${DATASET(0,0).toString(16).padStart(2, '0')}`);
console.log(`Valor en (0,1): 0x${DATASET(0,1).toString(16).padStart(2, '0')}`);
console.log(`Valor en (0,2): 0x${DATASET(0,2).toString(16).padStart(2, '0')}`);
console.log(`Valor en (0,3): 0x${DATASET(0,3).toString(16).padStart(2, '0')}`);
console.log(`Valor en (1,0): 0x${DATASET(1,0).toString(16).padStart(2, '0')}`);
console.log(`Valor en (1,1): 0x${DATASET(1,1).toString(16).padStart(2, '0')}`);
console.log(`Valor en (32,0): 0x${DATASET(32,0).toString(16).padStart(2, '0')}`);
