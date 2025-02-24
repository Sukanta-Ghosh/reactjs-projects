import React, { useState } from "react";
import CitySearch from "./text-highlight-components/CitySearch";

export default function App() {
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  return (
    <div>
      <h1>City Search</h1>
      <CitySearch cities={cities} />
    </div>
  );
}
