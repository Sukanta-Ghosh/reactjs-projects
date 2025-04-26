export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export const filterInitialState = {
  byStock: false,
  byRating: 0,
  byCategories: [],
  searchQuery: "",
};
export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };

    case "FILTER_BY_STOCK":
      return { ...state, byStock: JSON.parse(action.payload) };

    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };

    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "FILTER_BY_CATEGORY":
      let { checked, checkedCategory } = action.payload;

      let newSelectedCategories = checked
        ? [...state.byCategories, checkedCategory]
        : state.byCategories.filter((category) => category !== checkedCategory);
      return { ...state, byCategories: newSelectedCategories };

    case "CLEAR_FILTERS":
      return filterInitialState;

    default:
      return state;
  }
};
