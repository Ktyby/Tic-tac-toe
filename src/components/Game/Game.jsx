import React from "react";
import Board from "../Board";
import "./style.css";

const Game = () => (
  <div className="game">
    <h1 className="game__title">Крестики-Нолики</h1>
    <Board />
  </div>
);

export default Game;
