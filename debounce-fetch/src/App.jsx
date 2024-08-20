import React, { useState, useEffect } from "react";
import "./App.css";

//https://demo.dataverse.org/api/search?q=${value}
export default function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const rawData = await fetch(
        `https://demo.dataverse.org/api/search?q=${input}`
      );
      const jsonData = await rawData.json();

      console.log("Fetched data:", jsonData.data.items);
      setList(jsonData.data.items);
    }
    const debouncedFetch = debounce(fetchData, 2000);
    debouncedFetch();
  }, [input]);

  function debounce(fn, delay) {
    let timerId = null;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        fn(...args);
      }, [delay]);
    };
  }
  return (
    <div className="app">
      <input
        placeholder="Search Input.."
        onChange={(e) => setInput(e.target.value)}
      />
      {list.length > 0 && (
        <ul>
          {list.map((item, idx) => {
            return <li key={idx}>{item.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
