import React from "react";
import Products from "./components/Products";
import Filter from './components/Filter';
import Cart from "./components/Cart";

import store from './store';
import {Provider} from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) !==null ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
 
  } 

  createOrder = (order) => {
    console.log(order);
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;
    // daha önce eklenmiş ise ekleme 
    cartItems.map( (cartItem) => {
      if(cartItem._id === product._id){
        alreadyIncart = true;
        cartItem['productCount']++;
      }
      this.setState({cartItems: cartItems})
    });
   
    if(!alreadyIncart) {
      cartItems.push(product);
      this.setState({cartItems: cartItems})
    }

    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  }

  removeFromCart = (item) => {
   let deleteItem = false;
   let deleteItemIndex = 0;
   let remevoArr = false;
   
   this.state.cartItems.map((stateItem,i) => {
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
      this.state.cartItems[deleteItemIndex].productCount--;
      this.setState({cartItems: this.state.cartItems})
    }

    if(remevoArr) {
      this.state.cartItems.splice(deleteItemIndex,1);
      this.setState({cartItems: this.state.cartItems})
    }

    localStorage.setItem('cartItems',JSON.stringify(this.state.cartItems));
    

  }

 


  
  render() { 
    return (
      <Provider store={store} >
      <>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>

          <main>
            <div className="content">
              <div className="main">
              
               <Filter />
               
               <Products addToCart = {this.addToCart} />
              </div>

              <div className="main">
               <Cart createOrder={this.createOrder} cartItems = {this.state.cartItems} removeFromCart={this.removeFromCart} />
              </div>

              <div className="sidebar">
                sidebar
              </div>

            </div>
          </main>

          <footer>All right is reserved</footer>
        </div>
     </>
     </Provider>

    );
  }
}

export default App;
