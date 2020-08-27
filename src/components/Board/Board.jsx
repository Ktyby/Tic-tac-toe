import React from "react";
import Square from "../Square";
import ControlZone from "../ControlZone";
import calculateWinner from "./utils/calculateWinner";
import * as constants from "./constants.js";
import "./style.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(index) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
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

    return <div className="game__board-row">{arrayOfSquares}</div>
  }

  handleButtonClick = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Выиграл ${this.state.squares[winner[constants.FIRST_ELEMENT_FROM_WINNER]]}`;
    } else {
      status = this.state.squares.includes(null) ? `Следующий ход: ${this.state.xIsNext ? "X" : "O"}` : "Ничья";  
    }

    return (
      <div className="game__board">
        {this.renderSquaresFromRange(0, 2)}
        {this.renderSquaresFromRange(3, 5)}
        {this.renderSquaresFromRange(6, 8)}

        <div className="game__status">{status}</div>

        <ControlZone
          onClick={() => this.handleButtonClick()}
        />
      </div>
    );
  }
}

export default Board;