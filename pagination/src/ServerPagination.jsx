import { useEffect, useState } from "react";
import "./App.css";

/* Server side Pagination */
function ServerPagination({ productPerPage }) {
  //states
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // API call method
  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${productPerPage}&skip=${
        page * productPerPage - productPerPage
      }`
    );
    const data = await response.json();

    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productPerPage));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {/* Product display section */}
      <h1>Server-side Pagination</h1>
      {products.length === 0 && <h2 className="flex-center">Loading...</h2>}
      <h2>Total Products: {productPerPage * totalPages}</h2>

      {/* Products section */}
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span className="product__title">{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* Pagination section */}
      {products.length > 0 && (
        <div className="pagination">
          {/* left arrow */}
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {/* Here products.length / productPerPage defines total
            no of pages */}
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          {/* right arrow */}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default ServerPagination;
