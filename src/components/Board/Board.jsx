import React from "react";
import ControlZone from "../ControlZone";
import Square from "../Square";
import calculateWinner from "./utils/calculateWinner";
import { FIRST_ELEMENT_FROM_WINNER, COMPUTER_STEP_TIMEOUT_DURATION } from "./constants";
import { SINGLE_PLAYER_MODE } from "../../constants";
import "./style.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      gameMode: "two",
    };

    this.computerStepTimeout = null;
  }

  handleGameTypeChange = (gameMode) => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      gameMode,
    });
  }

  handlePlayAgainButtonClick = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    });
  }

  selectSquare = (clickedIndex, squares) => {
    this.computerStepTimeout = null;

    if (calculateWinner(squares) || squares[clickedIndex]) {
      return;
    }

    squares[clickedIndex] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleSquareClick = (clickedIndex) => {
    if (this.computerStepTimeout) {
      return;
    }

    const squares = this.state.squares.slice();

    this.selectSquare(clickedIndex, squares);

    if (this.state.gameMode === SINGLE_PLAYER_MODE) {
      const notSelectedSquares = squares.map((square, index) => ({ square, index })).filter(({square}) => square === null);
      const newSelectedSquare = notSelectedSquares[Math.round(Math.random() * (notSelectedSquares.length - 1))];

      this.computerStepTimeout = setTimeout(() => {
        this.selectSquare(newSelectedSquare && newSelectedSquare.index, squares || 0);
      }, COMPUTER_STEP_TIMEOUT_DURATION ); 
    }
  }

  renderSquaresFromRange(startIndex, finishIndex) {
    const arrayOfSquares = [];
    for (let index = startIndex; index <= finishIndex; index++) {
      arrayOfSquares.push(<Square 
        key={index}
        value={this.state.squares[index]}
        onClick={() => this.handleSquareClick(index)}
      />);
    } 

    return <div className="game__board-row">{arrayOfSquares}</div>
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
        <ControlZone
          onGameTypeChange={this.handleGameTypeChange}
          onPlayAgainButtonClick={this.handlePlayAgainButtonClick}
        />
      </div>
    );
  }
}

export default Board;