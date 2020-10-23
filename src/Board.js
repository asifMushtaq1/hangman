import React,{useState} from 'react';
import Cell from './Cell';
import './Board.css'

const Board = ({nrows,ncols,chanceLightStartOn}) => {
  const [state,setState] = useState({
    board:createBoard(),
    hasWon:false
  });
  
  function createBoard(){
    let board = [];
    for(let y=0;y<nrows;y++){
      let row=[];
      for(let x=0;x<ncols;x++){
        row.push(Math.random() < chanceLightStartOn);
      }
     board.push(row);
   }
   return board;
 }

  function flipCellsAround(coord) {
    let myboard = state.board;
    let [y,x] = coord.split("-").map(Number);
    function flipCell(y, x){
      if(x >= 0 && x < ncols && y>=0 && y<nrows){
        myboard[y][x]=!myboard[y][x];
      }
    }
    flipCell(y, x);     // flip initial
    flipCell(y, x-1);  // flip left
    flipCell(y, x+1); // flip right
    flipCell(y-1, x); //flip down
    flipCell(y+1, x); //flip up
    let Won = state.board.every(row => row.every(cell => !cell));
    setState({board:myboard,hasWon:Won})
  }
  if (state.hasWon) {
    return <h1>YOU WON!</h1>
  }
  let tblBoard = [];
  for(let y=0;y<nrows;y++){
    let row=[];
    for(let x=0;x<ncols;x++){
      let coord= `${y}-${x}`;
      row.push(
       <Cell 
         key={coord} 
         isLit={state.board[y][x]}flipCellsAroundMe={() => flipCellsAround(coord)}/>
       )
    }
   tblBoard.push(<tr >{row}</tr>)
  }
  return (
    <table className="Board">
      <tbody>
         {tblBoard}
      </tbody>
    </table>
   
  )
}
Board.defaultProps = {
  nrows:5,
  ncols:5,
  chanceLightStartOn:0.25
}
export default Board
