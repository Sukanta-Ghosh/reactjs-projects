import DropdownMultiple from "./components/searchable-dropdown/dropdown-multiple-select";
import DropdownSingle from "./components/searchable-dropdown/dropdown-single-select";
import "./App.css";
import "./searchable-dropdown.css";
import Header from "./components/header";
import Todo from "./components/todo-app/Todo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   return (
//     <div>
//       <DropdownSingle />
//       <DropdownMultiple />
//     </div>
//   );
// }

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <DropdownSingle />,
      },
      {
        path: "/dropdown-multiple",
        element: <DropdownMultiple />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
    ],
  },
]);

export default App;
