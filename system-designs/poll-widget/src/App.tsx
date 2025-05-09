import React, { useState, useEffect } from "react";
import PollWidget from "./components/Poll";
import { fetchPoll, submitVote, removeVote } from "./db/api";
import Loading from "./components/loading";
import { Poll as PollType } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [pollData, setPollData] = useState<PollType | null>(null);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const data = await fetchPoll(41);
        setPollData(data);
      } catch (error) {
        console.error("Failed to load poll:", error);
      }
    };

    loadPoll();
  }, []);

  if (!pollData) {
    return <Loading />;
  }

  const handleConfig = (config: string) => {
    if (config === "single") {
      setIsMultiple(false);
    } else {
      setIsMultiple(true);
    }
  };

  return (
    <div className="container">
      <select
        onChange={(e) => handleConfig(e.target.value)}
        className="select-config"
      >
        <option value="single">Single</option>
        <option value="multiple">Multiple</option>
      </select>
      <PollWidget
        pollId={pollData.id}
        title={pollData.question}
        options={pollData.options}
        isMultiple={isMultiple}
        onVote={submitVote}
        onVoteRemove={removeVote}
        styles={{}}
      />
    </div>
  );
};

export default App;
