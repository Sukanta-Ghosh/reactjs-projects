import React, { useCallback, useEffect, useState } from "react";
import { Option, PollProps } from "../types";
import "../styles/poll.css";

const PollWidget: React.FC<PollProps> = ({
  pollId,
  title,
  options,
  isMultiple = false,
  onVote,
  onVoteRemove,
  styles = {},
}) => {
  const [selectedOptionsIds, setSelectedOptionsIds] = useState<number[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);

  useEffect(() => {
    const storedVotes = localStorage.getItem(`poll-${pollId}`);
    if (storedVotes) {
      setSelectedOptionsIds(JSON.parse(storedVotes));
    }
  }, [pollId]);

  // find totalVotes
  const totalVotes = currentOptions.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  // Handler functions
  const handleVote = async (optionId: number) => {
    let newSelectedOptionsIds: number[];
    let updatedOptions;

    if (isMultiple) {
      if (selectedOptionsIds.includes(optionId)) {
        newSelectedOptionsIds = selectedOptionsIds.filter(
          (id) => id !== optionId
        );
        updatedOptions = await onVoteRemove(pollId, [optionId]);
      } else {
        newSelectedOptionsIds = [...selectedOptionsIds, optionId];
        updatedOptions = await onVote(pollId, [optionId]);
      }
    }
    // if single
    else {
      if (selectedOptionsIds.length > 0 && selectedOptionsIds[0] !== optionId) {
        await onVoteRemove(pollId, selectedOptionsIds);
      }
      newSelectedOptionsIds = [optionId];
      updatedOptions = await onVote(pollId, newSelectedOptionsIds);
    }

    setCurrentOptions(updatedOptions);
    setSelectedOptionsIds(newSelectedOptionsIds);
    //cache
    localStorage.setItem(
      `poll-${pollId}`,
      JSON.stringify(newSelectedOptionsIds)
    );
  };

  const handleRemoveVote = useCallback(async () => {
    const updatedOptions = await onVoteRemove(pollId, selectedOptionsIds);
    setSelectedOptionsIds([]);
    setCurrentOptions(updatedOptions);

    // cache
    localStorage.removeItem(`poll-${pollId}`);
  }, [pollId, selectedOptionsIds, onVoteRemove]);

  useEffect(() => {
    handleRemoveVote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultiple]);

  return (
    <fieldset
      className="poll-container"
      role="group"
      aria-labelledby={`poll-${pollId}-title`}
      style={styles.container}
    >
      <legend
        className="poll-title"
        id={`poll-${pollId}-title`}
        style={styles.title}
      >
        {title}
      </legend>
      <div
        className="poll-options-container"
        style={{
          ...styles.optionsContainer,
          maxHeight: currentOptions.length > 4 ? "200px" : "auto",
        }}
      >
        {currentOptions.map((option) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <div key={option.id} className="poll-option">
              <div className="poll-option-header">
                <label
                  className="poll-option-label"
                  htmlFor={`option-${option.id}`}
                  style={styles.optionLabel}
                >
                  <input
                    className="poll-option-input"
                    type={isMultiple ? "checkbox" : "radio"}
                    onChange={() => handleVote(option.id)}
                    checked={selectedOptionsIds.includes(option.id)}
                    /* accesibility */
                    id={`option-${option.id}`}
                    aria-checked={selectedOptionsIds.includes(option.id)}
                    aria-describedby={`option-${option.id}-info`}
                    style={styles.optionInput}
                  />
                  <span id={`option-${option.id}-info`}>{option.title}</span>
                </label>
                {selectedOptionsIds.length > 0 && (
                  <span
                    className="poll-option-votes"
                    style={styles.optionVotes}
                  >
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                )}
              </div>
              <div className="poll-progress-bar" style={styles.progressBar}>
                {selectedOptionsIds.length > 0 && (
                  <div
                    className="poll-progress-bar-fill"
                    style={{
                      transform: `scaleX(${percentage / 100})`,
                      ...styles.progressBarFill,
                    }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedOptionsIds.length > 0 && (
        <button
          className="poll-remove-button"
          onClick={handleRemoveVote}
          style={styles.removeButton}
        >
          Remove Vote
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
