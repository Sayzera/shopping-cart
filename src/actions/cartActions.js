import { ADD_TO_CART, REMOVE_FROM_CART } from "../types"

export const addToCart = (items, product) => (dispatch) => {
  
    const cartItems = items.slice();
    let alreadyIncart = false;


    cartItems.map( (cartItem) => {
        if(cartItem._id === product._id){
          alreadyIncart = true;
          cartItem['productCount']++;
         
        }
      });
     
      if(!alreadyIncart) {
        cartItems.push(product);
      }

      localStorage.setItem('cartItems',JSON.stringify(cartItems));

      
      dispatch({
          type: ADD_TO_CART,
          payload: {
              cartItems: cartItems
          }
      })
}


export const removeFromCart = (item,carts) => (dispatch,getState) => {
   console.log('get',getState());

   let deleteItem = false;
   let deleteItemIndex = 0;
   let remevoArr = false;  

   let cartItems = JSON.parse(localStorage.getItem('cartItems'));


   cartItems.map((stateItem,i) => {
    if(item._id === stateItem._id) {

      // tek tek kaldır 
        if(stateItem.productCount > 1) {
          deleteItem = true;
          deleteItemIndex = i;
        } else {
      // tek elemen ise diziyi kaldır 
          remevoArr = true;
          deleteItemIndex = i;
        }

    }

  });

  if(deleteItem) {
    cartItems[deleteItemIndex].productCount--;
  }

  if(remevoArr) {
    cartItems.splice(deleteItemIndex,1);
  }

  localStorage.setItem('cartItems',JSON.stringify(cartItems));


  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      cartItems: cartItems
    }
  })

 


}
