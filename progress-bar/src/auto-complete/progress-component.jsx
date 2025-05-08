import { useEffect, useState } from "react";
import ProgressBarAuto from "./ProgressBarAuto";
import "./styles-auto.css";

export default function AutoProgressBar() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 0.1);
    }, 20);
  }, []);

  const handleRefresh = () => {
    setValue(0);
    setSuccess(false);
  };

  return (
    <div className="app">
      <h3>Progress Bar Auto-complete</h3>
      <ProgressBarAuto value={value} onComplete={() => setSuccess(true)} />
      <span>{success ? "Complete!" : "Loading..."}</span>
      {success && <button onClick={handleRefresh}>Refresh</button>}
    </div>
  );
}
