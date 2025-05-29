/* Write a component that implements a timer. The
component should display the elapsed time in minutes and seconds,
formatted as "MM:SS". The timer should start at 0 and increase by 1 second
every second. */

import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState({ mm: 0, ss: 0 });

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.ss >= 10) {
          return { mm: prevTime.mm + 1, ss: 0 };
        }
        return { ...prevTime, ss: prevTime.ss + 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3>Timer</h3>
      {time.mm}:{time.ss}
    </div>
  );
};

export default Timer;
