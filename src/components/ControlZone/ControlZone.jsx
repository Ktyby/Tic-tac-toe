import React from "react";
import "./style.css";

const ControlZone = ({ onClick, onGameTypeChange }) => (
  <div className="game__controls">
    <button className="game__button" onClick={onClick}>Начать сначала</button>
    
    <div className="game__mode">
      <input className="game__input-mode" type="radio" name="inputMode" id="multiPlayer"  defaultChecked/>
      <label className="game__label" htmlFor="multiPlayer" onClick={() => onGameTypeChange("two")}>На двоих</label>
      <input className="game__input-mode" type="radio" name="inputMode" id="singlePlayer" />
      <label className="game__label" htmlFor="singlePlayer" onClick={() => onGameTypeChange("one")}>На одного</label>
    </div>
  </div>
);

export default ControlZone;