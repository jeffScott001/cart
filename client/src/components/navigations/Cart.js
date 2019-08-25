import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { removeFromCart, getCartItems } from "../../actions/shoeActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Cart extends Component {
  state = {
    isActive: false,
    active: "",
    total_price: null
  };
  componentDidUpdate(prevProp) {
    if (prevProp.isAuthenticated !== this.props.isAuthenticated) {
      this.props.getCartItems();
    }
    if (prevProp.items !== this.props.items) {
      const total = this.props.items
        .map(item => item.price)
        .reduce((total, price) => total + price, 0);
      this.setState({ total_price: total });
    }
  }
  isActive = () => {
    this.setState({ isActive: !this.state.isActive });
    if (!this.state.isActive) {
      this.setState({ active: "active" });
    } else {
      this.setState({ active: "" });
    }
  };

  deleteBtn = id => {
    this.props.removeFromCart(id);
  };

  render() {
    const items = this.props.items;
    const visible = this.props.visible;
    if (visible && items.length !== 0) {
      return (
        <Fragment>
          <div className="cart" onClick={this.isActive}>
            <p className="number">{items.length}</p>
            <i className="fas fa-shopping-cart" />
          </div>
          <div className={`cart-item-holder ${this.state.active}`}>
            <p style={{ color: "#333" }}>
              Selected shoes{" "}
              <span onClick={this.isActive} className="exit-btn">
                &times;
              </span>
            </p>
            <div className="cart-items-container">
              {items.map((item, index) => (
                <div className="cart-details-container" key={item._id}>
                  <div className="cart-img-container">
                    <img
                      className="cart-img"
                      src={item.url_main}
                      alt={item.ShoeName}
                    />
                  </div>
                  <div className="cart-text-container">
                    <p className="cart-price">Ksh: {item.price}</p>
                    <p className="cart-color-size">
                      Shoe size: {item.size}{" "}
                      <span className="cart-color">{item.color}</span>
                      <span className="cart-color">{item.ShoeName}</span>
                    </p>
                  </div>
                  <div className="cart-trash-kit">
                    <i
                      className="fas fa-trash-alt"
                      onClick={this.deleteBtn.bind(this, item._id)}
                    />
                  </div>
                </div>
              ))}
              {this.props.isAuthenticated ? (
                <Link className="link-order" to="/items/order">
                  <div className="total-price">
                    Order - Ksh : {this.state.total_price}
                  </div>
                </Link>
              ) : (
                <div className="register-login">
                  <Link to="/user/login">Login</Link> |{" "}
                  <Link to="/user/registration">Register</Link>{" "}
                  <span className="text-order">to Order</span>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      );
    } else {
      return <Fragment />;
    }
  }
}
Cart.propTypes = {
  items: PropTypes.array,
  visible: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  items: state.shoes.cart_items,
  isAuthenticated: state.auth.isAuthenticated,
  visible: state.shoes.cart_visible
});
export default connect(
  mapStateToProps,
  { removeFromCart, getCartItems }
)(Cart);
