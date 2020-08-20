import React from "react";
import Square from "../Square";
import "./style.css";

class Board extends React.Component {
  renderSquaresFromRange(startIndex, finishIndex) {
    const arrayOfSquares =[];
    for (let index = startIndex; index <= finishIndex; index++) {
      arrayOfSquares.push(<Square 
        value={this.props.squares[index]}
        onClick={() => this.props.onClick(index)}
      />);
    } 

    return <div className={"board-row"}>{arrayOfSquares}</div>
  }

  render() {
    return (
      <div>
        {this.renderSquaresFromRange(0, 2)}
        {this.renderSquaresFromRange(3, 5)}
        {this.renderSquaresFromRange(6, 8)}
      </div>
    );
  }
}

export default Board;
