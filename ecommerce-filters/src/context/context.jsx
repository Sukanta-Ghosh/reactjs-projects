/* eslint-disable react/prop-types */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  filterInitialState,
  filterReducer,
  shoppingCartReducer,
} from "./reducer";

const ShoppingCart = createContext();

const Context = ({ children }) => {
  // products state
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    products: [],
  });

  const [isLoading, setisLoading] = useState(false);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );

  const fetchProducts = async () => {
    setisLoading(true);
    const res = await fetch(`/products.json`);
    const data = await res.json();

    if (data && data.products) {
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data.products,
      });
    }
    setisLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ShoppingCart.Provider
      value={{ state, dispatch, isLoading, filterState, filterDispatch }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};

export const ShoppingCartState = () => {
  return useContext(ShoppingCart);
};

export default Context;
