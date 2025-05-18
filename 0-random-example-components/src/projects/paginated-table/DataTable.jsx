import React, { useState } from "react";
import "./styles-table.css";

const sampleData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 28 },
  { id: 5, name: "Eve", age: 27 },
  { id: 6, name: "Frank", age: 33 },
  { id: 7, name: "Grace", age: 24 },
  { id: 8, name: "Hank", age: 26 },
  { id: 9, name: "Ivy", age: 21 },
  { id: 10, name: "Jack", age: 29 },
  { id: 11, name: "Alice", age: 25 },
  { id: 12, name: "Bob", age: 30 },
  { id: 13, name: "Charlie", age: 22 },
  { id: 14, name: "David", age: 28 },
  { id: 15, name: "Eve", age: 27 },
  { id: 16, name: "Frank", age: 33 },
  { id: 17, name: "Grace", age: 24 },
  { id: 18, name: "Hank", age: 26 },
  { id: 19, name: "Ivy", age: 21 },
  { id: 20, name: "Jack", age: 29 },
];

function DataTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const totalPages = Math.ceil(sampleData.length / perPage);

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(0);
  };

  const handlePagination = (config) => {
    if (config === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    }

    if (config === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
            </tr>
          </thead>

          <tbody>
            {sampleData
              .slice(currentPage * perPage, currentPage * perPage + perPage)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="toolbar">
        <div className="pagination">
          <button
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 0 ? true : false}
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePagination("next")}
            disabled={currentPage + 1 === totalPages ? true : false}
          >
            Next
          </button>
        </div>
        <div className="per-page">
          <label>Rows per page: </label>
          <select onChange={(e) => handlePerPageChange(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
