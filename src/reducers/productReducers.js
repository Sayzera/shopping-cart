import { FETCH_PRODUCTS } from "../types";

export const productsReducer = (state = {}, action) => {
    
    // Burda sadece gelen veriyi alıyoruz karşılıyoruz
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                items: action.payload
            }
    
        default:
            return state;
    }

}