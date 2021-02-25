import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";

export const productsReducer = (state = {}, action) => {
  // Burda sadece gelen veriyi alıyoruz karşılıyoruz
  switch (action.type) {
    // Küçükten büyüğe veya tam tersi
    case FILTER_PRODUCTS_BY_SIZE:
    return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };

    case FETCH_PRODUCTS:
      return {
        items: action.payload,
        filteredItems: action.payload,
      };
    default:
      return state;
  }
};
