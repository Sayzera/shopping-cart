import React, { Component } from "react";
import formatCurreny from "../util";

export default class Cart extends Component {
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

                <button className="button primary">Proceed</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
