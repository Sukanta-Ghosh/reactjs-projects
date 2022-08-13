import React, { useRef, useState } from "react";

function Ref() {
  const [myNum, setMyNum] = useState(0);

  //useRef
  const inputOne = useRef();
  const inputTwo = useRef();

  const getNumBox = () => {
    console.log("Num Box Hello");
    console.log(inputOne.current);
    inputOne.current.style.width = "400px";
  };

  const getTextBox = () => {
    console.log("Text Box Hello");
    console.log(inputTwo.current);
  };

  return (
    <div>
      <h2>useRef() Hook Explianed</h2>
      <input
        value={myNum}
        ref={inputOne}
        style={{ width: "100px" }}
        type="number"
        onChange={(e) => setMyNum(e.target.value)}
      />

      <input
        value={myNum}
        ref={inputTwo}
        type="text"
        onChange={(e) => setMyNum(e.target.value)}
      />

      <h3>Value is : {myNum}</h3>

      <button onClick={() => getNumBox()}>Rupee</button>
      <button onClick={() => getTextBox()}>Dollar</button>
    </div>
  );
}

export default Ref;
