import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import AutoProgressBar from "./auto-complete/progress-component";
import Form from "./form-fields/Form";

function Routing() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Form Fields</Link>
        <Link to="/auto-complete">Auto Complete</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Form></Form>}></Route>
        <Route
          path="/auto-complete"
          element={<AutoProgressBar></AutoProgressBar>}
        ></Route>

        {/* wild card path */}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default Routing;
