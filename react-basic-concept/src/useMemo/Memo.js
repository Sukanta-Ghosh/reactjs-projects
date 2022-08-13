/* useMemo: Memorisation, used to optimize performance based on value*/
import React, { useMemo, useState } from "react";

function Memo(props) {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const IncrementOne = () => {
    setCounterOne(counterOne + 1);
  };

  const IncrementTwo = () => {
    setCounterTwo(counterTwo + 1);
  };

  const isEven = useMemo(() => {
    console.log(".......");
    let i = 0;
    //Creating more time to load
    while (i < 200000000) i++;
    return counterOne % 2 === 0;
  }, [counterOne]);

  return (
    <div>
      <button onClick={IncrementOne}>counterOne({counterOne})</button>
      <span> - {isEven ? "Even" : "Odd"}</span>
      <br />
      <button onClick={IncrementTwo}>counterOne({counterTwo})</button>
    </div>
  );
}

export default Memo;
