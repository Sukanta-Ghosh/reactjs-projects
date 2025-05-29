import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DropdownMultiple from "./projects/searchable-dropdown/dropdown-multiple-select";
import DropdownSingle from "./projects/searchable-dropdown/dropdown-single-select";
import Todo from "./projects/todo-app/Todo";
import "./App.css";
import Header from "./layouts/header";
import DataTable from "./projects/paginated-table/DataTable";

function App() {
  return <RouterProvider router={router} />;
}

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
      {
        path: "/table",
        element: <DataTable />,
      },
    ],
  },
]);

export default App;
