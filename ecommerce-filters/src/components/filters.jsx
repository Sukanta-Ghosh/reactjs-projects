import { useSearchParams } from "react-router-dom";
import { ShoppingCartState } from "../context/context";
import StarRating from "./star-rating";
import { useEffect, useState } from "react";

const filterMap = {
  sort: "SORT_BY_PRICE",
  byRating: "FILTER_BY_RATING",
  byStock: "FILTER_BY_STOCK",
  byCategories: "FILTER_BY_SEARCH",
  searchQuery: "FILTER_BY_SEARCH",
};

// config
const allCategories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const Filters = () => {
  // states
  const { filterState, filterDispatch } = ShoppingCartState();
  const { byStock, sort, byRating, byCategories } = filterState;
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  // Routing
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // TODO: For byCategories it will not work
    if (searchParams.size > 0) {
      searchParams.forEach((value, key) => {
        filterDispatch({
          type: filterMap[key],
          payload: value,
        });
      });
    }
  }, []);

  useEffect(() => {
    setSearchParams(filterState);
  }, [filterState]);

  const handleChangeCategory = (checkedCategory, e) => {};

  return (
    <div className="flex flex-col w-96 gap-2">
      <span className="font-bold">Filter Products</span>
      <button
        className="bg-slate-500 text-white rounded-sm"
        onClick={() =>
          filterDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </button>
      <span>
        <input
          type="radio"
          className="mr-2"
          id="Ascending"
          name="sort"
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
        <label htmlFor="Ascending">Ascending</label>
      </span>
      <span>
        <input
          type="radio"
          className="mr-2"
          id="descending"
          name="sort"
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
        <label htmlFor="descending">Descending</label>
      </span>

      <span>
        <input
          type="checkbox"
          className="mr-2"
          id="outofstock"
          name="outofstock"
          onChange={() =>
            filterDispatch({
              type: "FILTER_BY_STOCK",
              payload: !byStock,
            })
          }
          checked={byStock}
        />
        <label htmlFor="outofstock">Include Out of Stock</label>
      </span>

      <span className="flex items-center">
        <label className="pr-2">Rating</label>
        <StarRating
          rating={byRating}
          onChange={(i) =>
            filterDispatch({
              type: "FILTER_BY_RATING",
              payload: i,
            })
          }
        />
      </span>

      <span className="items-center">
        <label
          className="pr-2"
          onClick={() => setIsOpenCategory(!isOpenCategory)}
          style={{ cursor: "pointer" }}
        >
          {isOpenCategory ? "⬇️" : "➡️"} Categories
        </label>
        <div
          className="category-list"
          style={{ display: `${isOpenCategory ? "block" : "none"}` }}
        >
          {allCategories.map((category, idx) => {
            return (
              <div key={idx}>
                <input
                  type="checkbox"
                  className="mr-2"
                  id="category"
                  name="category"
                  onChange={(e) =>
                    filterDispatch({
                      type: "FILTER_BY_CATEGORY",
                      payload: {
                        checkedCategory: category,
                        checked: e.target.checked,
                      },
                    })
                  }
                  checked={byCategories?.includes(category)}
                />
                {category}
              </div>
            );
          })}
        </div>
      </span>
    </div>
  );
};

export default Filters;
