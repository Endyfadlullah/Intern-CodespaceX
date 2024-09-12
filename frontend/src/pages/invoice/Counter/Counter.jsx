import React, { useState } from "react";
import "./Counter.css";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <span className="number">{count}</span>
      <div className="controls">
        <button className="arrow up" onClick={increment}><FaChevronUp/></button>
        <button className="arrow down" onClick={decrement}><FaChevronDown/></button>
      </div>
    </div>
  );
};

export default Counter;
