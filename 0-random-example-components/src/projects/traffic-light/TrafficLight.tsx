import React, { useState, useEffect } from "react";
import "./TrafficLight.css"; // Import the CSS file

const TrafficLight = () => {
  const [light, setLight] = useState("red");

  useEffect(() => {
    let timeout;

    const cycleLights = (current) => {
      let next, delay;

      switch (current) {
        case "red":
          next = "green";
          delay = 3000;
          break;
        case "green":
          next = "yellow";
          delay = 2000;
          break;
        case "yellow":
          next = "red";
          delay = 1000;
          break;
        default:
          next = "red";
          delay = 3000;
      }

      timeout = setTimeout(() => {
        setLight(next);
        cycleLights(next);
      }, delay);
    };

    cycleLights(light);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="traffic-container">
      <div className="traffic-box">
        <div className={`light red ${light === "red" ? "on" : ""}`}></div>
        <div className={`light yellow ${light === "yellow" ? "on" : ""}`}></div>
        <div className={`light green ${light === "green" ? "on" : ""}`}></div>
      </div>
    </div>
  );
};

export default TrafficLight;
