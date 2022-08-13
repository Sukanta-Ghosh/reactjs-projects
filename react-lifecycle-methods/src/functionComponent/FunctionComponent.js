import React from "react";
import { useState } from "react";
import FuncCounter from "./FuncCounter";

function FunctionComponent() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <div>
        <FuncCounter number={counter} />
        <button onClick={increment}>Click Me</button>
      </div>
    </div>
  );
}

export default FunctionComponent;
