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
