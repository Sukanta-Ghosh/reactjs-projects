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
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);

  useEffect(() => {
    const storedVotes = localStorage.getItem(`poll-${pollId}`);
    if (storedVotes) {
      setSelectedOptions(JSON.parse(storedVotes));
    }
  }, [pollId]);

  const totalVotes = currentOptions.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  // Handler functions
  const handleVote = async (optionId: number) => {
    let newSelectedOptions: number[];
    let updatedOptions;

    if (isMultiple) {
      if (selectedOptions.includes(optionId)) {
        newSelectedOptions = selectedOptions.filter((id) => id !== optionId);
        updatedOptions = await onVoteRemove(pollId, [optionId]);
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
        updatedOptions = await onVote(pollId, [optionId]);
      }
    }
    // if single
    else {
      if (selectedOptions.length > 0 && selectedOptions[0] !== optionId) {
        await onVoteRemove(pollId, selectedOptions);
      }
      newSelectedOptions = [optionId];
      updatedOptions = await onVote(pollId, newSelectedOptions);
    }

    setCurrentOptions(updatedOptions);
    setSelectedOptions(newSelectedOptions);
    localStorage.setItem(`poll-${pollId}`, JSON.stringify(newSelectedOptions));
  };

  const handleRemoveVote = useCallback(async () => {
    const updatedOptions = await onVoteRemove(pollId, selectedOptions);
    setSelectedOptions([]);
    localStorage.removeItem(`poll-${pollId}`);
    setCurrentOptions(updatedOptions); // Update the state with new options
  }, [pollId, selectedOptions, onVoteRemove]);

  useEffect(() => {
    handleRemoveVote();
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
                    /* accesibility */
                    id={`option-${option.id}`}
                    checked={selectedOptions.includes(option.id)}
                    aria-checked={selectedOptions.includes(option.id)}
                    aria-describedby={`option-${option.id}-info`}
                    style={styles.optionInput}
                  />
                  <span id={`option-${option.id}-info`}>{option.title}</span>
                </label>
                {selectedOptions.length > 0 && (
                  <span
                    className="poll-option-votes"
                    style={styles.optionVotes}
                  >
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                )}
              </div>
              <div className="poll-progress-bar" style={styles.progressBar}>
                {selectedOptions.length > 0 && (
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
      {selectedOptions.length > 0 && (
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
