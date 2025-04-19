import { useEffect, useState } from "react";

const optionsData = [
  { id: 1, option: "apple", selected: false },
  { id: 2, option: "orange", selected: false },
  { id: 3, option: "mango", selected: false },
  { id: 4, option: "applejuice", selected: false },
  { id: 5, option: "mangePickle", selected: false },
  { id: 6, option: "orangeshake", selected: false },
];
const config = ["single", "multiple"];

const DropdownMultiple = () => {
  const [inputValue, setInputValue] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const [data, setData] = useState([]);
  const [configValue, setConfigValue] = useState("single");
  const [options, setOptions] = useState(optionsData);

  useEffect(() => {
    if (inputValue !== "") {
      setOpenDrop(true);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setInputValue("");
      setOptions(optionsData);
      return;
    }

    setInputValue(e.target.value);

    const filteredValues = options.filter(
      (item) =>
        item.option.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );

    setOptions(filteredValues);
  };

  const handleConfigChange = (e) => {
    setConfigValue(e.target.value);
    setData([]);
    setOptions(optionsData);
  };

  const handleOptions = (e) => {
    console.log("handleOptions:", e.target);

    let textContent = e.target.textContent;
    if (configValue === "single") {
      setData([textContent]);
    } else if (configValue === "multiple") {
      if (data.includes(textContent)) {
        setData((data) =>
          data.filter(
            (item) => item.toLowerCase() !== textContent.toLowerCase()
          )
        );
      } else {
        setData((data) => [...data, textContent]);
      }

      // options
      setOptions((options) =>
        options.map((item) => {
          if (item.option === textContent) {
            return { ...item, selected: !item.selected };
          }

          return item;
        })
      );
    }
  };

  const handleFocus = (e) => {
    setOpenDrop(!openDrop);
  };

  return (
    <div>
      <select onChange={handleConfigChange}>
        {config.map((ele) => (
          <option key={ele}>{ele}</option>
        ))}
      </select>
      <div className="dropdown">
        <input
          value={inputValue}
          onChange={handleChange}
          onClick={handleFocus}
          type="text"
        />

        {openDrop && (
          <div className="option-section">
            {options.map((ele) => {
              return (
                <div
                  key={ele.id}
                  onClick={handleOptions}
                  style={{ color: ele.selected ? "blue" : "black" }}
                >
                  {ele.option}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="show-content">
        {data.length > 0 &&
          data.map((ele) => {
            return <div key={ele}>{ele}</div>;
          })}
      </div>
    </div>
  );
};

export default DropdownMultiple;
