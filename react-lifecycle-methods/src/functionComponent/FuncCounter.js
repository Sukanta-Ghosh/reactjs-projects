import React from "react";
import { useEffect } from "react";

function FuncCounter({ number }) {
  useEffect(() => {
    console.log(
      "Function Component: useEffect Mounting before component render"
    );
  }, []);

  useEffect(() => {
    console.log("Function Component: useEffect Updating...");

    //With this we can achieve unmounting
    /* Remove FuncCounter component from FunctionComponent return function 
    in order achieve unmounting*/
    return () => {
      console.log("Functional Component: Unmounted/Removed");
    };
  }, [number]);

  return (
    <div>
      <h3>{number}</h3>
    </div>
  );
}

export default FuncCounter;
