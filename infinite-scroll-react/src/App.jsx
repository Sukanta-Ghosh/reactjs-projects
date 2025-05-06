/* eslint-disable react-hooks/exhaustive-deps */
/* Implement Infinite scrolling in a React JS.

Requirements:
  - Implement infinite scrolling for fetching more products when the user reaches the bottom 
    of the page.
    https://dummyjson.com/products
  - Ensure that loading indicators are displayed appropriately while fetching data.
  - Implement Optimizations to prevent excessive API requests during scrolling.
*/

import "./App.css";
import IntersectionObserverInfinite from "./ts-components/IntersectionObserverInfinite";
//import IntersectionObserverInfinite from "./component/IntersectionObserverInfinite";

const App = () => {
  return (
    <div>
      <IntersectionObserverInfinite />
    </div>
  );
};

export default App;
