import React from "react";
import { SINGLE_PLAYER_MODE, MULTI_PLAYER_MODE } from "../../constants";
import "./style.css";

const ControlZone = ({ onPlayAgainButtonClick, onGameTypeChange }) => (
  <div className="game__controls">
    <button className="game__button" onClick={onPlayAgainButtonClick}>Начать сначала</button>
    
    <div className="game__mode">
      <input className="game__input-mode" type="radio" name="inputMode" id="multiPlayer"  defaultChecked/>
      <label className="game__label" htmlFor="multiPlayer" onClick={() => onGameTypeChange(MULTI_PLAYER_MODE)}>На двоих</label>
      <input className="game__input-mode" type="radio" name="inputMode" id="singlePlayer" />
      <label className="game__label" htmlFor="singlePlayer" onClick={() => onGameTypeChange(SINGLE_PLAYER_MODE)}>На одного</label>
    </div>
  </div>
);

export default ControlZone;