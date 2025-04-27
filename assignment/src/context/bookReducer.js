export const bookReducer = (state, action) => {
    switch (action.type) {
      case "SET_BOOKS":
        return { ...state, books: action.payload };
      case "FILTER_BY_PRICE":
        return { ...state, filterPrice: action.payload };
      default:
        return state;
    }
  };
  