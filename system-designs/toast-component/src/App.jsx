import useNotification from "./ts-components/useNotification";
import "./App.css";
import "./Notification.css";
import { useState } from "react";

const configPositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const configAnimations = ["slide", "fade", "pop"];

function App() {
  // states
  const [position, setPosition] = useState(configPositions[0]);
  const [animation, setAnimation] = useState(configAnimations[0]);

  // hooks
  const { NotificationComponent, triggerNotification } =
    useNotification(position);

  return (
    <div className="App">
      {NotificationComponent}
      <h1>Toast Component</h1>
      <label className="configs">
        Positions: &nbsp;
        <select onChange={(e) => setPosition(e.target.value)}>
          {configPositions.map((position, idx) => (
            <option key={idx} value={position}>
              {position}
            </option>
          ))}
        </select>
      </label>
      <label className="configs">
        Animations: &nbsp;
        <select onChange={(e) => setAnimation(e.target.value)}>
          {configAnimations.map((animation, idx) => (
            <option key={idx} value={animation}>
              {animation}
            </option>
          ))}
        </select>
      </label>
      <div className="btns">
        <button
          onClick={() =>
            triggerNotification({
              type: "success",
              message: "This is a success message!",
              duration: 3000,
              animation: animation,
            })
          }
        >
          Show Success
        </button>
        <button
          onClick={() =>
            triggerNotification({
              type: "info",
              message: "This is an info message!",
              duration: 3000,
              animation: animation,
            })
          }
        >
          Show Info
        </button>
        <button
          onClick={() =>
            triggerNotification({
              type: "warning",
              message: "This is a warning message!",
              duration: 3000,
              animation: animation,
            })
          }
        >
          Show Warning
        </button>
        <button
          onClick={() =>
            triggerNotification({
              type: "error",
              message: "This is an error message!",
              duration: 3000,
              animation: animation,
            })
          }
        >
          Show Error
        </button>
      </div>
    </div>
  );
}

export default App;
