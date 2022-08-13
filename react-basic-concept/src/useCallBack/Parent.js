/* useCallback: Memorisation, used to optimize performance based on function */
import React, { useCallback, useState } from "react";
import Child from "./Child";

function Parent() {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const IncrementOne = () => {
    setCounterOne(counterOne + 1);
  };

  const func = useCallback(() => {
    return <div>Function Call</div>;
  }, [counterTwo]);

  return (
    <div>
      <h3>Parent Component</h3>
      <Child prop={func} />
      <button onClick={IncrementOne}>counterOne({counterOne})</button>
    </div>
  );
}

export default Parent;
