import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  //   const options = [
  //     { id: 1, option: "apple", selected: false },
  //     { id: 2, option: "orange", selected: false },
  //     { id: 3, option: "mango", selected: false },
  //     { id: 4, option: "applejuice", selected: false },
  //     { id: 5, option: "mangePickle", selected: false },
  //     { id: 6, option: "orangeshake", selected: false },
  //   ];

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
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // Handle selection of an option
  const handleSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);
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
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}

      <h1>CONTENT</h1>
    </div>
  );
};

export default CustomDropdown;
