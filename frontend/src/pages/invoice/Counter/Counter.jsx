import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import "./Counter.css";

const Counter = ({ value, onChange }) => {
  const increment = () => {
    onChange(value + 1);
  };

  const decrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="counter">
      <span className="number">{value}</span>
      <div className="controls">
        <button className="arrow up" onClick={increment}><FaChevronUp /></button>
        <button className="arrow down" onClick={decrement}><FaChevronDown /></button>
      </div>
    </div>
  );
};

export default Counter;
