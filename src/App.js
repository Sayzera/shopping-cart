import React from "react";
import Products from "./components/Products";
import data from "./data.json";
import Filter from './components/Filter';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size:"",
      sort:""
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
               <Products products={this.state.products} />
              </div>

              <div className="main">
              carts items 
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
