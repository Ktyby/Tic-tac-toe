import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Square = ({ value, onClick }) => (
  <button className="game__square" onClick={onClick}>
    {value}
  </button>
);

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}

export default Square;
