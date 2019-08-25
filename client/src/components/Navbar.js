import React, { Component } from "react";
import SearchBar from "./navigations/SearchBar";
import Loggers from "./navigations/Loggers";
import Cart from "./navigations/Cart";

class Navbar extends Component {
  state = {
    slide: ""
  };
  componentDidMount() {
    document.addEventListener("scroll", this.hundleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.hundleScroll);
  }
  hundleScroll = e => {
    if (window.scrollY > 50) {
      this.setState({
        slide: "slide"
      });
    } else {
      this.setState({
        slide: ""
      });
    }
  };
  render() {
    return (
      <div className={`nav ${this.state.slide}`}>
        <div className={`title-container ${this.state.slide}`}>
          <h1>
            <i className="fas fa-shoe-prints" /> MAMA NGASH SHOE SHOP{" "}
            <i className="fas fa-shoe-prints" />
          </h1>
          <p className="slogan">
            Check out your favorite shoes here at an affordable price
          </p>
        </div>
        <div className={`options-container ${this.state.slide}`}>
          <div className="search-container">
            <SearchBar />
          </div>
          <div className="logger-container">
            <Loggers />
          </div>
          <div className="cart-container">
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
