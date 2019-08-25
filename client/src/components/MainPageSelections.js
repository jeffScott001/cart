import React, { Component } from "react";
import AddToCart from "./AddToCart";
import uuid from "uuid";
export class MainPageSelections extends Component {
  state = {
    selected: false,
    cart: "",
    sizes: "",
    colors: "",
    container: "",
    selectedShoe: {
      _id: "",
      shoeName: "",
      size: null,
      color: null,
      url_main: "",
      price: "",
      unique: null
    }
  };

  changeIcon = () => {
    this.setState({ selected: !this.state.selected });
  };

  selectorChange = e => {
    const { _id, shoeName, url_main, price } = this.props.item;
    const classValue = e.target.className;
    const active = "active";
    const inactive = "inactive";
    const domant = "domant";
    if (
      e.target.id === "container" ||
      e.target.id === "cart-add" ||
      e.target.id === "cart-add-text"
    ) {
      this.setState({
        cart: inactive,
        sizes: active,
        colors: domant,
        container: inactive,
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
    if (classValue === "shoe-sizes-selector-main") {
      this.setState({
        cart: domant,
        sizes: inactive,
        colors: active,
        container: inactive,
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
    if (classValue === "shoe-colors-selector-main") {
      this.setState({
        cart: "",
        sizes: domant,
        colors: inactive,
        container: "",
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
      <div className={`main-icons-container ${this.state.container}`}>
        <div className="main-icon-container">
          <AddToCart shoe={this.state.selectedShoe} />
          <div onClick={this.changeIcon} className="fav-icon-container">
            {!isSelected ? (
              <span className="text-fav">Add To Favorite</span>
            ) : (
              <span className="text-fav">Favorite</span>
            )}
            {isSelected ? (
              <i className="fas fa-star" />
            ) : (
              <i className="far fa-star" />
            )}
          </div>

          <div
            id="container"
            onClick={this.selectorChange}
            className={`add-cart-container-main ${this.state.cart}`}
          >
            <i id="cart-add" className="fas fa-cart-plus add-cart-main" />{" "}
            <span id="cart-add-text" className="text-cart">
              Add To Cart
            </span>
          </div>
          {/* here */}
          <div className={`selector-sizes-container-main ${this.state.sizes}`}>
            <p className="title-sizes-selector-main">Select The Size</p>
            <ul className="sizes-selector-main">
              {item.size !== undefined
                ? item.size.map(num => (
                    <li
                      value={num}
                      className="shoe-sizes-selector-main"
                      key={num}
                      onClick={this.selectorChange}
                    >
                      {num}
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div
            className={`selector-colors-container-main ${this.state.colors}`}
          >
            <p className="title-colors-selector-main">Select Color</p>
            <ul className="colors-selector-main">
              {item.colors !== undefined
                ? item.colors.map(color => (
                    <li
                      className="shoe-colors-selector-main"
                      key={color}
                      name={color}
                      onClick={this.selectorChange}
                    >
                      {color}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPageSelections;
