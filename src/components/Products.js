/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import formatCurreny from "../util";
import {Fade, Zoom} from 'react-reveal';
import Modal from 'react-modal';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null
    }
  }

  openModal = (product) => {
    this.setState({product})
  }

  closeModal = () => {
    this.setState({product: null})
  }

 
  render() {
    const { product } = this.state;
    return (
      <div>
      <Fade bottom cascade={true}>
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => this.openModal(product) }>
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurreny(product.price)}</div>
                  <button
                    onClick={() => this.props.addToCart(product)}
                    className="button primary"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </Fade>

        {
          product && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>X</button>
                <div className="product-details">
                  <img src={product.image} alt={product.title}></img>
                  <div className="product-details-description">
                    <p>
                     <strong> { product.title }</strong>
                    </p>
                    <p>
                      {
                        product.description
                      }
                    </p>
                    <p>
                      Avaiable Sizes
                      {product.availableSize.map( x => (
                        <span>{' '} <button className>{x}</button></span>
                      ) )}
                    </p>
                    <p>
                      <div className="product-price"> 
                          <div>
                            { formatCurreny( product.price)}
                            <button className="button primary" onClick={() => {
                              this.closeModal();
                              this.props.addToCart(product);
                            }}>Add to cart</button>
                          </div>
                      </div>
                    </p>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )
        }
      </div>
    );
  }
}
