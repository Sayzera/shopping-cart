/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import formatCurreny from "../util";
import {Fade, Zoom} from 'react-reveal';
import Modal from 'react-modal';
import {connect} from 'react-redux';

import {fetchProducts} from '../actions/productsActions';

class Products extends Component {
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

  componentDidMount() {
    this.props.fetchProducts();

  }

 
  render() {
    const { product } = this.state;
    return (
      <div>
      <Fade bottom cascade={true}>
      {
        !this.props.products ?
         (<div>loading...</div>) : (
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
         )
        
      }
      
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


export default connect((state) => {
  // burdaki değeri props olarak alabilirz
  return {
    products: state.products.filteredItems
  }
},{fetchProducts})(Products);
