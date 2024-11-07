import "./App.css";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import ClientPagination from "./ClientPagination";
import ServerPagination from "./ServerPagination";

// Config: productPerPage for pagination
const productPerPage = 9;
function App() {
  return (
    <>
      {/* Header Section */}
      <div className="navbar">
        <Link to="/client" style={linkStyle}>
          Client Pagination
        </Link>
        <Link to="/server" style={linkStyle}>
          Server Pagination
        </Link>
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/client"
          element={
            <ClientPagination
              productPerPage={productPerPage}
            ></ClientPagination>
          }
        ></Route>

        <Route path="/" element={<Navigate to="/client"></Navigate>}></Route>

        <Route
          path="/server"
          element={
            <ServerPagination
              productPerPage={productPerPage}
            ></ServerPagination>
          }
        ></Route>
      </Routes>
    </>
  );
}

const linkStyle = {
  margin: "1rem",
  fontWeight: "bold",
  textDecoration: "none",
  color: "blue",
};

export default App;
