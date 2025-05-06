import { Option, PollProps } from "../types";
import "../styles/poll.css";
import { useEffect, useState } from "react";

const PollWidget: React.FC<PollProps> = ({
  pollId,
  title,
  options,
  isMultiple = false,
  onVote,
  onVoteRemove,
}) => {
  const [currentOptions, setcurrentOptions] = useState<Option[]>(options);
  const [selectedOptionsIds, setSelectedOptionsIds] = useState<number[]>([]);

  const totalVotes = currentOptions.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  const handleVote = async (optionId: number) => {
    let newSelectedOptionsIds;
    let updateOptions;

    if (isMultiple) {
      if (selectedOptionsIds.includes(optionId)) {
        newSelectedOptionsIds = selectedOptionsIds.filter(
          (id) => id !== optionId
        );
        updateOptions = await onVoteRemove(pollId, selectedOptionsIds);
      } else {
        newSelectedOptionsIds = [...selectedOptionsIds, optionId];
        updateOptions = await onVote(pollId, newSelectedOptionsIds);
      }
    } else {
      if (selectedOptionsIds.length > 0 && selectedOptionsIds[0] !== optionId) {
        await onVoteRemove(pollId, selectedOptionsIds);
      }
      newSelectedOptionsIds = [optionId];
      updateOptions = await onVote(pollId, newSelectedOptionsIds);
    }

    setcurrentOptions(updateOptions);
    setSelectedOptionsIds(newSelectedOptionsIds);
  };

  const handleRemoveVote = async () => {
    const updateOptions = await onVoteRemove(pollId, selectedOptionsIds);
    setcurrentOptions(updateOptions);
    setSelectedOptionsIds([]);
  };

  useEffect(() => {
    handleRemoveVote();
  }, [isMultiple]);

  return (
    <fieldset className="poll-container ">
      <legend className="poll-title">{title}</legend>
      <div className="poll-options-container">
        {currentOptions.map((option) => {
          const percentage = (option.votes / totalVotes) * 100;
          return (
            <div className="poll-option" key={option.id}>
              <div className="poll-option-header">
                <label className="poll-option-label">
                  <input
                    type={isMultiple ? "checkbox" : "radio"}
                    onChange={() => handleVote(option.id)}
                    checked={selectedOptionsIds.includes(option.id)}
                  />
                  <span>{option.title}</span>
                </label>
                {selectedOptionsIds.length > 0 && (
                  <span className="poll-option-votes">
                    {option.votes} votes {percentage.toFixed(1)}%
                  </span>
                )}
              </div>
              <div className="poll-progress-bar">
                {selectedOptionsIds.length > 0 && (
                  <div
                    className="poll-progress-bar-fill"
                    style={{ transform: `scaleX(${percentage / 100})` }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedOptionsIds.length > 0 && (
        <button className="poll-remove-button" onClick={handleRemoveVote}>
          Remove Vote
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
