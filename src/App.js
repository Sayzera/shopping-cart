import React from "react";
import Products from "./components/Products";
import data from "./data.json";
import Filter from './components/Filter';
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size:"",
      sort:""
    }
 
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
    

  }

  sortProducts = (event) => {
  //impl
  const sort = event.target.value;
  // fiyatları ucuz pahalı olarak sıralar
  this.setState({
    sort: sort,
    products: this.state.products.slice().sort( (a,b) => ( 
      
         sort === "lowest" ? 
         ( (a.price > b.price)? 1: -1 ):
      
        sort === "heighest"? 
        ((a.price < b.price)? 1: -1):
        ((a._id > b._id)? 1:-1)


     )
    )
  })

  }



  filterProducts = (event) => {
  //impl
  // bedenlere görele sıralama yapar ve sonra set eder
  if(event.target.value ==="") {
    this.setState({size: event.target.value ,products:data.products})
  } else {
    this.setState({
      size: event.target.value,
      products: data.products.filter( product => product.availableSize.indexOf(event.target.value) >= 0 )
    })
  }

  }

  
  render() { 
    return (
      <>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>

          <main>
            <div className="content">
              <div className="main">
               <Filter count={this.state.products.length}
                 size={this.state.size}
                 sort={this.state.sort}
                 filterProducts={this.filterProducts}
                 sortProducts={this.sortProducts}
               />
               <Products products={this.state.products}
               addToCart = {this.addToCart} />
              </div>

              <div className="main">
               <Cart cartItems = {this.state.cartItems} removeFromCart={this.removeFromCart} />
              </div>

              <div className="sidebar">
                sidebar
              </div>

            </div>
          </main>

          <footer>All right is reserved</footer>
        </div>
      </>
    );
  }
}

export default App;
