import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Square(props) {
  const {value, onClick} = props;
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}

export default Square;
