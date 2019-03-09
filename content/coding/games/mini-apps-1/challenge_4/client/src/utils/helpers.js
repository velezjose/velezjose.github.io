const ROWS = 6;
const COLUMNS = 7;

const getInitialTable = () => {
  let initialTable = [];
  for (let i = 0; i < ROWS; i += 1) {
    initialTable.push([]);
    for (let j = 0; j < COLUMNS; j += 1) {
      initialTable[i].push(0);
    }
  }
  return initialTable;
};

const getColIndexesToFill = () => {
  let colIndexesToFill = [];
  for (let i = 0; i < COLUMNS; i += 1) {
    colIndexesToFill.push(ROWS - 1);
  }
  return colIndexesToFill;
};

export { getInitialTable, getColIndexesToFill };
