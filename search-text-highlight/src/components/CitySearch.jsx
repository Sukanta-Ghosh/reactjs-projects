import React, { useState } from "react";
import HighlightText from "./HighlightText";

const CitySearch = ({ cities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <HighlightText text={city} highlight={searchTerm} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;
