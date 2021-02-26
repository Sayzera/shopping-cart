import React, { Component } from "react";
import formatCurreny from "../util";
import Fade from 'react-reveal/Fade';
import { connect } from "react-redux";

import {removeFromCart} from '../actions/cartActions';
import Modal from 'react-modal';
import {createOrder, clearOrder} from '../actions/orderActions';
import { Zoom } from "react-reveal";
class Cart extends Component {
  
  constructor(props) {
      super(props); 
      this.state = {
          showCheckout: false,
          formElements: {}
      }
  }

 closeModal = () => {
   this.props.clearOrder();
 
 }
  handleInput = (e) => {
    this.state.formElements[e.target.name] = e.target.value;
    this.setState({formElements:this.state.formElements})
  }

  _createOrder = (e) => {
    e.preventDefault();
    let order = {};
    order = {...this.state.formElements, cartItems: this.props.cartItems,total:
       this.props.cartItems.reduce((a,c) => a + c.price * c.productCount, 0)
    }

    this.props.createOrder(order);
    
  }



  render() {
    const { cartItems, order } = this.props;
  
    return (
      <div>
        {cartItems === undefined ?  (
          <div className="cart cart-header"> Cart is Empty </div>
        ) : (
          <div className="cart cart-header">You have {cartItems.length}</div>
        )}


        {order ? (
          <Modal isOpen={true}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>X</button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurreny(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map(x => (
                        <div>
                        {' '}
                        {x.productCount} * {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        ) : <div> </div>}

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
                    <button onClick={() => {
                      // this.props.removeFromCart(item);
                      this.props.removeFromCart(item, cartItems
                      );
                    }}>
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
                <form onSubmit={this._createOrder}>
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

export default connect(state => {
  if(state.order.clearData) { state.cart.cartItems = [] }

  
  return {
    cartItems: state.cart.cartItems ?  state.cart.cartItems : state.cart,
    order : state.order.order
  }
}, {removeFromCart, createOrder, clearOrder})(Cart)