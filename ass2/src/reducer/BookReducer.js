export const BookReducer = (state, action) => {
    switch (action.type) {
      case "SET_BOOKS":
        return { ...state, books: action.payload };
        case "SET_BOOKSTORE_INFO":
        return { ...state, storename: action.payload.storename, location: action.payload.location };
      case "FILTER_BY_PRICE":
        return { ...state, filterPrice: action.payload };
      default:
        return state;
    }
  };