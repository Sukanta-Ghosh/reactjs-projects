import React, { useState, useRef, useEffect } from "react";
import "./searchable-dropdown.css";

const config = ["single", "multiple"];
const options = [
  { id: 1, value: "apple" },
  { id: 2, value: "orange" },
  { id: 3, value: "mango" },
  { id: 4, value: "applejuice" },
  { id: 5, value: "mangojuice" },
  { id: 6, value: "orangeshake" },
  { id: 7, value: "bananashake" },
  { id: 8, value: "banana" },
];

const DropdownSingle = () => {
  // states
  const [inputValue, setInputValue] = useState("");
  // search filtered options
  const [filteredOptions, setFilteredOptions] = useState([]);
  // selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [configValue, setConfigValue] = useState("single");

  // refs
  const dropdownRef = useRef(null);

  // Show dropdown when input is focused
  const handleFocus = () => {
    setIsOpen(true);
    if (filteredOptions.length > 0) {
      setFilteredOptions(filteredOptions);
    } else {
      setFilteredOptions(options);
    }
  };

  // Filter options based on user input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === "") {
      setFilteredOptions(options);
      return;
    }
    setIsOpen(true);

    const filtered = options.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // Handle selection of an option
  const handleSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);

    //TODO:
    if (configValue === "multiple") {
    }
  };

  const handleConfigChange = (e) => {
    setConfigValue(e.target.value);
    //setData([]);
    setFilteredOptions(options);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="app">
      <select onChange={handleConfigChange}>
        {config.map((ele) => (
          <option key={ele}>{ele}</option>
        ))}
      </select>
      <div className="dropdown" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Select an option"
          value={inputValue}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="dropdown-list">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option.value)}>
                {option.value}
              </li>
            ))}
          </ul>
        )}

        <h1>CONTENT</h1>
      </div>
    </div>
  );
};

export default DropdownSingle;
