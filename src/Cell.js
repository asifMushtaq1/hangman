import React from 'react';
import './Board.css'

const Cell = (props) => {
 const handleClick = event => {
     props.flipCellsAroundMe();
 }
 let classes = props.isLit ? "CellLit" : "Cell";
  return (
   <td className={classes} onClick={handleClick}/>
  )
}

export default Cell;
