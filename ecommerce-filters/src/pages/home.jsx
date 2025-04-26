import { useMemo, useState } from "react";
import { ShoppingCartState } from "../context/context";
import Pagination from "../components/pagination";
import StarRating from "../components/star-rating";
import Filters from "../components/filters";

const Home = () => {
  const [page, setPage] = useState(1);

  const {
    state: { products },
    filterState: { sort, byStock, byRating, searchQuery, byCategories },
    isLoading,
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

    if (byCategories?.length > 0) {
      filteredProducts = filteredProducts.filter((prod) =>
        byCategories.includes(prod.category)
      );
    }

    setPage(1);

    return filteredProducts;
  }, [sort, byStock, byRating, searchQuery, byCategories, products]);

  return (
    <div>
      <div className="py-9 flex">
        {/* Filters */}
        <Filters />

        {/* Products */}
        {isLoading && <h2>Loading...</h2>}
        {filteredProducts.length > 0 ? (
          <div className="products w-full">
            {filteredProducts?.slice(page * 10 - 10, page * 10).map((prod) => {
              return (
                <span className={`products__single`} key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>Name: {prod.title}</span>
                  <div>Category: {prod.category}</div>
                  <hr />
                  <span>$ {prod.price}</span>
                  <StarRating rating={prod.rating} />
                </span>
              );
            })}
          </div>
        ) : (
          <h2>No Products Found with filters...</h2>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <Pagination products={filteredProducts} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default Home;
