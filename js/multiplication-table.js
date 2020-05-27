// function responsible for producing data for multiplication table
function Exception(message) {
  this.message = message;
}

function multiplicationTable(colStart, rowStart, size) {
  if (typeof (colStart) !== 'number' || typeof (rowStart) !== 'number' || typeof (size) !== 'number'
      || Math.floor(colStart) <= 0 || Math.floor(rowStart) <= 0 || Math.floor(size) <= 0) {
    throw new Exception('Function requires three integer arguments that are greater or equal than 1');
  } else {
    let table = Array(size + 1).fill(0).map(() => {return Array(size).fill(size + 1)});
    table[0][0] = null;

    for (let i = 1; i <= size; i+=1) {
      table[0][i] = colStart + (i - 1);
    }

    for (let j = 1; j <= size; j+=1) {
      table[j][0] = rowStart + (j - 1);
    }

    for (let i = 1; i < size + 1; i+=1) {
      for (let j = 1; j < size + 1; j+=1) {
        table[i][j] = (rowStart + i - 1) * (colStart + j -1);
      }
    }
    return table;
  }
}
