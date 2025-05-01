/* eslint-disable react/prop-types */

import React from "react";
import { SuggestionsListProps } from "./types";

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  highlight,
  onSuggestionClick,
  selectedIndex,
  dataKey,
}) => {
  // Get Highlighted Text
  const getHighlightedText = (text: string, highlight: string): JSX.Element => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey
          ? suggestion[dataKey]
          : suggestion;

        return (
          <li
            key={index}
            id={`suggestion-${index}`}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-item"
            role="option"
            aria-selected={selectedIndex === index}
          >
            {getHighlightedText(currSuggestion as string, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;