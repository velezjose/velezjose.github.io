const RowEntry = ({ onCircleClickHandler, rowIndex, columnIndex, colorValue }) => {
  let color = colorValue === 0 ? 'white' : ( colorValue === 1 ? 'blue' : 'red');
  
  return (
    <button
      onClick={onCircleClickHandler}
      style={{ width: 50, height: 50, borderRadius: '80%', outline: 'none', backgroundColor: color, margin: 10 }}
      id={rowIndex.toString() + columnIndex.toString()}>
    </button>
  )
};

export default RowEntry;