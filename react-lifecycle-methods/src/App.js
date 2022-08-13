/* React Life Cycle Methods */
import React from "react";
import ClassComponent from "./classComponent/ClassComponent";
import FunctionComponent from "./functionComponent/FunctionComponent";

const App = () => {
  return (
    <React.Fragment>
      <h1>Class Component</h1>
      <ClassComponent />
      <h1>Function Component</h1>
      <FunctionComponent />
    </React.Fragment>
  );
};

export default App;
