import RowEntry from './RowEntry.jsx';

const Row = ({ row, rowIndex, onCircleClickHandler }) => (
  <div>
    { row.map((rowEntry, columnIndex) =>
      (<RowEntry
        colorValue={rowEntry}
        onCircleClickHandler={onCircleClickHandler}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
      />))
    }
  </div>
);

export default Row;