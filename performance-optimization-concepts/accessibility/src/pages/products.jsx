import {Suspense, lazy, useMemo, useState} from "react";
import {ShoppingCartState} from "../context/context";
import Filters from "../components/filters";

const StarRating = lazy(() => import("../components/star-rating"));
const Pagination = lazy(() => import("../components/pagination"));

const Home = () => {
  const [page, setPage] = useState(1);

  const {
    state: {products, cart},
    dispatch,
    filterState: {sort, byStock, byRating, searchQuery},
  } = ShoppingCartState();

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;

    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return sort === "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
    }

    if (!byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.inStock);
    }

    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.rating >= byRating
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setPage(1);

    return filteredProducts;
  }, [sort, byStock, byRating, searchQuery, products]);

  return (
    <div>
      <div className="py-9 flex">
        {/* Filters */}
        <Filters />
        {/* Products */}
        {filteredProducts.length > 0 && (
          <section aria-labelledby="products-heading">
            <h2 id="products-heading">Products</h2>
            <ul className="products w-full">
              {filteredProducts
                ?.slice(page * 10 - 10, page * 10)
                .map((prod) => {
                  const inCart = cart.some((p) => p.id === prod.id);

                  return (
                    <li className={`products__single`} key={prod.id}>
                      <img src={prod.thumbnail} alt={prod.title} />
                      <span>{prod.title}</span>
                      <hr />
                      <span>$ {prod.price}</span>
                      <Suspense fallback={<div>Loading...</div>}>
                        <StarRating rating={prod.rating} />
                      </Suspense>
                      <button
                        className={`px-2 py-1 mt-2 ${
                          !inCart ? "bg-orange-400" : "bg-blue-400"
                        } border-none rounded-sm disabled:opacity-50`}
                        disabled={!prod.inStock}
                        onClick={() =>
                          dispatch({
                            type: inCart ? "REMOVE_FROM_CART" : "ADD_TO_CART",
                            payload: prod,
                          })
                        }
                        aria-label={
                          !prod.inStock
                            ? "Out of Stock"
                            : inCart
                            ? "Remove from Cart"
                            : "Add to Cart"
                        }
                      >
                        {prod.inStock
                          ? !inCart
                            ? "Add to Cart"
                            : "Remove from Cart"
                          : "Out of Stock"}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </section>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <Suspense fallback={<div>Pagination Loading...</div>}>
          <Pagination
            products={filteredProducts}
            page={page}
            setPage={setPage}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
