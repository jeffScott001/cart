import React, { Component } from "react";
import AddToCart from "./AddToCart";
import { connect } from "react-redux";
import uuid from "uuid";

import PropTypes from "prop-types";

class Selection extends Component {
  state = {
    selected: false,
    cart: "",
    sizes: "",
    colors: "",
    selectedShoe: {
      _id: "",
      shoeName: "",
      size: null,
      color: null,
      url_main: "",
      price: "",
      unique: ""
    }
  };
  componentDidUpdate() {}
  changeIcon = () => {
    this.setState({ selected: !this.state.selected });
  };
  onClick = e => {
    const { _id, shoeName, url_main, price } = this.props.item;
    const value = e.target.className;
    const active = "active";
    const inactive = "inactive";
    const domant = "domant";
    if (value === "fas fa-cart-plus details") {
      this.setState({
        cart: inactive,
        sizes: active,
        colors: domant,
        selectedShoe: {
          _id,
          shoeName,
          url_main,
          size: null,
          color: null,
          price
        }
      });
    }
    if (value === "shoe-sizes-selector") {
      this.setState({
        cart: domant,
        sizes: inactive,
        colors: active,
        selectedShoe: {
          _id,
          shoeName,
          url_main,
          size: e.target.textContent,
          color: null,
          price
        }
      });
    }
    if (value === "shoe-colors-selector") {
      this.setState({
        cart: active,
        sizes: domant,
        colors: inactive,
        selectedShoe: {
          _id,
          shoeName,
          url_main,
          size: this.state.selectedShoe.size,
          color: e.target.textContent,
          price,
          unique: uuid.v4()
        }
      });
    }
  };
  render() {
    const isSelected = this.state.selected;
    const item = this.props.item;
    return (
      <div className="selector-container">
        <AddToCart shoe={this.state.selectedShoe} />
        <div className={`cart-add-container ${this.state.cart}`}>
          <p className="title-cart-add">Add To Cart</p>
          <i className="fas fa-cart-plus details" onClick={this.onClick} />
          <div onClick={this.changeIcon} className="fav-icon-container-detail">
            {!isSelected ? (
              <span className="text-fav-detail">Add To Favorite</span>
            ) : (
              <span className="text-fav-detail">Favorite</span>
            )}
            {isSelected ? (
              <i className="fas fa-star detail" />
            ) : (
              <i className="far fa-star detail" />
            )}
          </div>
        </div>
        <div className={`selector-sizes-container ${this.state.sizes}`}>
          <p className="title-sizes-selector">Select The Size</p>
          <ul className="sizes-selector">
            {item.size !== undefined
              ? item.size.map(num => (
                  <li
                    className="shoe-sizes-selector"
                    key={num}
                    onClick={this.onClick}
                  >
                    {num}
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className={`selector-colors-container ${this.state.colors}`}>
          <p className="title-colors-selector">Select Color</p>
          <ul className="colors-selector">
            {item.colors !== undefined
              ? item.colors.map(color => (
                  <li
                    className="shoe-colors-selector"
                    key={color}
                    onClick={this.onClick}
                  >
                    {color}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    );
  }
}
Selection.propTypes = {
  addToCart: PropTypes.func
};

export default connect(
  null,
  {}
)(Selection);
