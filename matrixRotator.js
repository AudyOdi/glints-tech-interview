function matrixRotator(rows, columns, numOfRotation, matrix) {
  let subArrayCount = parseInt(Math.min(rows, columns) / 2);

  let rotatedMatrix = [...matrix];

  for (let i = 0; i < numOfRotation; i++) {
    for (
      let subArrayIndex = 0;
      subArrayIndex < subArrayCount;
      subArrayIndex++
    ) {
      let matrixEdgeIndices = getMatrixEdgeIndices(
        subArrayIndex,
        rows,
        columns,
      );

      rotatedMatrix = rotateMatrix(rotatedMatrix, matrixEdgeIndices);
    }
  }

  return rotatedMatrix;
}

function rotateMatrix(matrix, edgeIndices) {
  let rotatedMatrix = [...matrix];
  let [topLeftRow, topLeftColumn] = edgeIndices.topLeftIndex;
  let [topRightRow, topRightColumn] = edgeIndices.topRightIndex;

  let [bottomLeftRow, bottomLeftColumn] = edgeIndices.bottomLeftIndex;
  let [bottomRightRow, bottomRightColumn] = edgeIndices.bottomRightIndex;

  let temp = rotatedMatrix[topLeftRow][topLeftColumn];

  // rotate top side
  for (let i = topLeftColumn; i < topRightColumn; i++) {
    rotatedMatrix[topLeftRow][i] = rotatedMatrix[topLeftRow][i + 1];
  }

  // rotate left side
  for (let i = topLeftRow + 1; i <= bottomLeftRow; i++) {
    let oldValue = rotatedMatrix[i][topLeftColumn];
    rotatedMatrix[i][topLeftColumn] = temp != null ? temp : oldValue;
    temp = oldValue;
  }

  // rotate bottom side
  for (let i = bottomLeftColumn + 1; i <= bottomRightColumn; i++) {
    let oldValue = rotatedMatrix[bottomLeftRow][i];
    rotatedMatrix[bottomLeftRow][i] = temp != null ? temp : oldValue;
    temp = oldValue;
  }

  // rotate right side
  for (let i = topRightRow; i < bottomRightRow; i++) {
    rotatedMatrix[i][topRightColumn] = rotatedMatrix[i + 1][topRightColumn];
  }
  rotatedMatrix[bottomRightRow - 1][bottomRightColumn] = temp;

  return rotatedMatrix;
}

function getMatrixEdgeIndices(subArrayIndex, matrixRowSize, matrixColumnSize) {
  return {
    topLeftIndex: [subArrayIndex, subArrayIndex],
    topRightIndex: [subArrayIndex, matrixColumnSize - subArrayIndex - 1],
    bottomLeftIndex: [matrixRowSize - subArrayIndex - 1, subArrayIndex],
    bottomRightIndex: [
      matrixRowSize - subArrayIndex - 1,
      matrixColumnSize - subArrayIndex - 1,
    ],
  };
}

// RUN THE FUNCTION
console.log(
  matrixRotator(4, 4, 1, [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]),
);

console.log(
  matrixRotator(4, 4, 2, [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]),
);

console.log(
  matrixRotator(5, 4, 7, [
    [1, 2, 3, 4],
    [7, 8, 9, 10],
    [13, 14, 15, 16],
    [19, 20, 21, 22],
    [25, 26, 27, 28],
  ]),
);

console.log(matrixRotator(2, 2, 3, [[1, 1], [1, 1]]));
