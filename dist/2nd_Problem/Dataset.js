"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DATASET(row, column) {
    const patternRow = Math.floor(row / 4); // Bloques de 4 filas
    const BlockPattern = patternRow * 0x08; // Incremento cada 4 filas (0x08 = 8 en decimal)
    const patternColumn = column % 8; // Columnas cíclicas cada 8
    const increaseRow = (row % 2) * 4; // Alterna entre 0 y 4 cada fila
    // Valores de columna (patrón: [1, 0, 1, 2, 3, 2, 3, 0])
    const columnValues = [1, 0, 1, 2, 3, 2, 3, 0];
    const columnValue = columnValues[patternColumn];
    return BlockPattern + increaseRow + columnValue;
}
console.log(`Valor en (0,0): 0x${DATASET(0, 0).toString(16).padStart(2, '0')}`);
console.log(`Valor en (0,1): 0x${DATASET(0, 1).toString(16).padStart(2, '0')}`);
console.log(`Valor en (0,2): 0x${DATASET(0, 2).toString(16).padStart(2, '0')}`);
console.log(`Valor en (0,3): 0x${DATASET(0, 3).toString(16).padStart(2, '0')}`);
console.log(`Valor en (1,0): 0x${DATASET(1, 0).toString(16).padStart(2, '0')}`);
console.log(`Valor en (1,1): 0x${DATASET(1, 1).toString(16).padStart(2, '0')}`);
console.log(`Valor en (2,0): 0x${DATASET(4, 0).toString(16).padStart(2, '0')}`);
//# sourceMappingURL=Dataset.js.map