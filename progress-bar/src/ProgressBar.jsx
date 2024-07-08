import React, { useEffect } from "react";

const ProgressBar = ({ percent }) => {
  //const cappedPercent = Math.min(Math.max(0, percent), 100);

  return (
    <div className="wrapper">
      <div className="progress" style={{ width: `${percent}%` }} />
    </div>
  );
};

// const Wrapper = styled.div`
//   width: 100%;
//   height: 20px;
//   border-radius: 5px;
//   background-color: lightgrey;
// `;

// const FilledBar = styled.div`
//   height: 100%;
//   border-radius: 5px;
//   background-color: green;
//   width: ${(props) => props.percent}%;
// `;

export default ProgressBar;
