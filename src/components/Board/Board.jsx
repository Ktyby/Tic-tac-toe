import React from "react";
import ControlZone from "../ControlZone";
import Square from "../Square";
import calculateWinner from "./utils/calculateWinner";
import * as constants from "./constants.js";
import "./style.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      gameMode: "two",
    };
  }

  handleGameTypeChange = (gameMode) => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      gameMode,
    });
  }

  handleButtonClick = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    });
  }

  selectSquare = (clickedIndex, squares) => {
    if (calculateWinner(squares) || squares[clickedIndex]) {
      return;
    }

    squares[clickedIndex] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

  handleClick = (clickedIndex) => {
    const squares = this.state.squares.slice();

    this.selectSquare(clickedIndex, squares);

    if (this.state.gameMode === constants.SINGLE_PLAYER_MODE) {
      const notSelectedSquares = squares.map((square, index) => ({ square, index })).filter(({square}) => square === null);
      const newSelectedSquare = notSelectedSquares[Math.round(Math.random() * (notSelectedSquares.length - 1))];

      setTimeout(() => {
        this.selectSquare(newSelectedSquare.index || 0, squares);
      }, 1000); 
    }
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
          onGameTypeChange={this.handleGameTypeChange}
          onClick={this.handleButtonClick}
        />
      </div>
    );
  }
}

export default Board;