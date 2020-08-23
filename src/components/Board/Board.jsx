import React from "react";
import Square from "../Square";
import calculateWinner from "./utils/calculateWinner";
import "./style.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquaresFromRange(startIndex, finishIndex) {
    const arrayOfSquares = [];
    for (let index = startIndex; index <= finishIndex; index++) {
      arrayOfSquares.push(<Square 
        value={this.state.squares[index]}
        onClick={() => this.handleClick(index)}
      />);
    } 

    return <div className="board-row">{arrayOfSquares}</div>
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if ((winner === null) && (this.state.squares.includes(null) === false)) {
      status = "Ничья";  
    } else {
      if (winner) {
        status = `Выиграл ${winner}`;
      } else {
        status = `Следующий ход: ${this.state.xIsNext ? "X" : "O"}`;
      }
    }

    return (
      <div>
        {this.renderSquaresFromRange(0, 2)}
        {this.renderSquaresFromRange(3, 5)}
        {this.renderSquaresFromRange(6, 8)}
        <div className="status">{status}</div>
      </div>
    );
  }
}

export default Board;
