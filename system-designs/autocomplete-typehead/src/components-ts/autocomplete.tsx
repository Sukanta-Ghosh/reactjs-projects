/* eslint-disable react/prop-types */

import React, { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import SuggestionsList from "./suggestions-list";
import { AutocompleteProps } from "./types";
import useCache from "./use-cache";

const Autocomplete: React.FC<AutocompleteProps> = ({
  staticData,
  fetchSuggestions,
  caching = true,
  dataKey = "",
  placeholder = "",
  customloading = "Loading...",
}) => {
  /* States */
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  /* Ref */
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  /* Custom Hook */
  const { setCache, getCache } = useCache("autocompleteCache", 3600);

  /* Handler Functions */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    setSuggestions([]);
  };

  const getSuggestions = async (query: string) => {
    setError(null);

    const cachedSuggestions = getCache(query);
    if (cachedSuggestions && caching) {
      setSuggestions(cachedSuggestions as string[]);
    } else {
      setLoading(true);
      try {
        let result: string[] = [];
        if (staticData) {
          result = staticData.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
        } else if (fetchSuggestions) {
          result = await fetchSuggestions(query);
        }
        setCache(query, result);
        setSuggestions(result);
      } catch (err) {
        setError("Failed to fetch suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 1000),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [inputValue, getSuggestionsDebounced]);

  const handleBlur = () => {
    setIsDropdownOpen(false);
  };

  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const scrollIntoView = (index: number) => {
    if (suggestionsListRef.current) {
      const suggestionElements =
        suggestionsListRef.current.getElementsByTagName("li");
      if (suggestionElements[index]) {
        suggestionElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) => {
          const newIndex =
            (prevIndex - 1 + suggestions.length) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="autocomplete-container">
      <h4>Typescript Component</h4>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="autocomplete-input"
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
      />
      {((isDropdownOpen && suggestions.length > 0) || loading || error) && (
        <ul
          id="suggestions-list"
          className="suggestions-list"
          role="listbox"
          ref={suggestionsListRef}
        >
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customloading}</div>}

          <SuggestionsList
            dataKey={dataKey}
            suggestions={suggestions}
            highlight={inputValue}
            onSuggestionClick={handleSuggestionClick}
            selectedIndex={selectedIndex}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
