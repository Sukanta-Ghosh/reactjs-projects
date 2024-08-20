import { useEffect, useState } from "react";
import "./App.css";

/* Client side pagination */
function ClientPagination({ productPerPage }) {
  //states
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  /* totalPages: Highest no of pages need to show all fetched products */
  const totalPages = Math.ceil(products.length / productPerPage);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    console.log("Fetched Data:", data);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <h1>Client-side Pagination</h1>
      {products.length === 0 && <h2 className="flex-center">Loading...</h2>}
      {/* Product display section */}
      <h2>Total Products: {products.length}</h2>
      {products.length > 0 && (
        <div className="products">
          {products
            .slice(
              page * productPerPage - productPerPage,
              page * productPerPage
            )
            .map((prod) => {
              return (
                <span className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />{" "}
                  {/* alt is imp */}
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

          {/* Here totalPages defines total
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

export default ClientPagination;
