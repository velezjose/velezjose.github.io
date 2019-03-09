import Row from './Row.jsx';

const Table = ({ table, onCircleClickHandler }) => (
  <div>
    {table.map((row, rowIndex) =>
      (<Row
        row={ row }
        rowIndex={ rowIndex }
        onCircleClickHandler={ onCircleClickHandler }
      />))
    }
  </div>
);

export default Table;