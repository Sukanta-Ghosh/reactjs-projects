import "./App.css";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import ClientPagination from "./components/ClientPagination";
import ServerPagination from "./components/ServerPagination";
import TruncatePagination from "./components/truncate-pagination/TruncatePagination";

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
        <Link to="/truncate-pagination" style={linkStyle}>
          Truncate Pagination
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

        <Route
          path="/truncate-pagination"
          element={
            <TruncatePagination
              productPerPage={productPerPage}
            ></TruncatePagination>
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
