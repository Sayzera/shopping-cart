import React, { Component } from "react";
import formatCurreny from "../util";
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
  
  constructor(props) {
      super(props); 
      this.state = {
          showCheckout: false,
          formElements: {}
      }
  }


  handleInput = (e) => {
    this.state.formElements[e.target.name] = e.target.value;
    this.setState({formElements:this.state.formElements})
  }

  createOrder = (e) => {
    
    e.preventDefault();
    let order = [];
    order.push(this.state.formElements,this.props.cartItems)

    this.props.createOrder(order);
  }



  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Cart is Empty </div>
        ) : (
          <div className="cart cart-header">You have {cartItems.length}</div>
        )}

        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
        <Fade left cascede>

              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}></img>
                </div>

                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurreny(item.price)} x {item.productCount}{" "}
                    <button onClick={() => this.props.removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
              </Fade>
            ))}
          </ul>
          
        </div>

        <div className="cart">
          <div className="total">
            {cartItems.length === 0 ? (
              ""
            ) : (
              <>
                <div>
                  Total:{" "}
                  {formatCurreny(
                    cartItems.reduce((a, c) => {
                      // iki değer toplanıyor a ya atılıyor
                      return a + c.price * c.productCount;
                    }, 0)
                  )}
                </div>

                <button onClick={()=>this.setState({showCheckout: true})} className="button primary">Proceed</button>
              </>
            )}
          </div>
       
        </div>
        {this.state.showCheckout  &&  (
            <Fade right cascade>
             <div className="cart"> 
                <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                        <li>
                            <label>Email</label>
                            <input type="email" 
                            required 
                            onChange={this.handleInput}
                            name="email"></input>
                        </li>
                        <li>
                            <label>Name</label>
                            <input type="text" 
                            required 
                            onChange={this.handleInput}
                            name="name"></input>
                        </li>
                        <li>
                            <label>Address</label>
                            <input type="address" 
                            required 
                            onChange={this.handleInput}
                            name="address"></input>
                        </li>

                        <li>
                            <button className="button primary" type="submit">Checkout</button>
                        </li>
                    </ul>
                </form>
             </div>
             </Fade>
         )}   
      </div>
    );
  }
}
