import Autocomplete from "./components/autocomplete";
//import Autocomplete from "./components-ts/autocomplete";
import "./App.css";

/* const staticData = [
  "apple",
  "banana",
  "berrl",
  "orange",
  "grape",
  "mango",
  "melon",
  "berry",
  "peach",
  "cherry",
  "plum",
]; */

const fetchSuggestions = async (query) => {
  const response = await fetch(
    `https://dummyjson.com/recipes/search?q=${query}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.recipes;
};

const App = () => {
  return (
    <div className="App">
      <h1>Autocomplete / Typeahead</h1>
      {/* <h2>Using Static Data</h2>
      <Autocomplete staticData={staticData} />

      <h2>Using Dynamic Data</h2> */}
      <Autocomplete
        fetchSuggestions={fetchSuggestions}
        dataKey="name"
        caching={true}
        customloading={<div>Loading Recipes...</div>}
        placeholder={"Enter a recipe..."}
        //onSelect={(res) => console.log(res)}
        // onChange={(e) => {}}
        // onFocus={(e) => {}}
        // onBlur={(e) => {}}
        // customStyles={}
      />
    </div>
  );
};

export default App;
