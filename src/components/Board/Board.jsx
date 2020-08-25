import React, { createRef } from "react";
import Square from "../Square";
import calculateWinner from "./utils/calculateWinner";
import "./style.css";
const FIRST_ELEMENT_FROM_WINNER = 0;

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
      status = `Выиграл ${this.state.squares[winner[FIRST_ELEMENT_FROM_WINNER]]}`;
    } else {
      status = this.state.squares.includes(null) ? `Следующий ход: ${this.state.xIsNext ? "X" : "O"}` : "Ничья";  
    }
    return (
      <div className="game__board">
        {this.renderSquaresFromRange(0, 2)}
        {this.renderSquaresFromRange(3, 5)}
        {this.renderSquaresFromRange(6, 8)}
        <div className="game__status">{status}</div>
        <button className="game__button" onClick={this.handleButtonClick}>Начать сначала</button>
        <div className="game__mode">
          <input className="game__input-mode" type="radio" name="inputMode" id="singlePlayer"/><label className="game__label" htmlFor="singlePlayer">На одного</label>
          <input className="game__input-mode" type="radio" name="inputMode" id="multiPlayer"/><label className="game__label" htmlFor="multiPlayer">На двоих</label>
        </div>
      </div>
    );
  }
}

export default Board;