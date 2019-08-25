import React, { Component } from "react";
import { connect } from "react-redux";
import {
  cartVisibility,
  searchBoxVisible,
  placeOrder
} from "../actions/shoeActions";
import { Redirect } from "react-router-dom";

export class Order extends Component {
  state = {
    toggle: false,
    payment_method: "M-pesa",
    address: "",
    county: "",
    region: "",
    street: "",
    phone_number: "",
    sur_name: "",
    email: "",
    m_pesa_code: "",
    user_id: "",
    first_name: "",
    last_name: ""
  };
  componentDidMount() {
    this.props.cartVisibility(false);
    this.props.searchBoxVisible(false);
    if (this.props.user) {
      const {
        county,
        email,
        phone_number,
        region,
        street,
        sur_name,
        _id,
        first_name,
        last_name
      } = this.props.user;
      this.setState({
        address: `${county}, ${region}, ${street}`,
        county,
        region,
        street,
        phone_number,
        sur_name,
        email,
        user_id: _id,
        first_name,
        last_name
      });
    }
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  update = () => {
    const { county, region, street } = this.state;
    this.setState({
      address: `${county}, ${region}, ${street}`
    });
    this.setState({ toggle: !this.state.toggle });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.nativeEvent.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const cart_items = this.props.cart_items;
    const {
      county,
      email,
      phone_number,
      region,
      street,
      sur_name,
      user_id,
      payment_method,
      m_pesa_code,
      first_name,
      last_name
    } = this.state;
    const orderDetails = {
      county,
      email,
      phone_number,
      region,
      street,
      sur_name,
      user_id,
      m_pesa_code,
      payment_method,
      first_name,
      last_name,
      ordered_items: cart_items
    };
    this.props.placeOrder(orderDetails);
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const order_palaced = this.props.order_palaced;
    if (isAuthenticated) {
      return (
        <div className="body-order">
          {order_palaced ? (
            <Redirect to="/items/order/successfully_placed" />
          ) : null}
          <div className="order-container">
            <h1 className="order-title">Order confirmation</h1>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="" className="location-lable">
                Delivery Address
              </label>
              <div className="order-input-container">
                <input
                  type="text"
                  className="location-input"
                  value={this.state.address}
                  readOnly
                />
                <button
                  type="button"
                  onClick={this.toggle}
                  className="btn-order-location"
                >
                  Change
                </button>
              </div>
              <label htmlFor="" className="location-lable">
                Phone Number(edit if required)
              </label>
              <div className="order-input-container">
                <input
                  type="text"
                  className="location-input"
                  name="phone_number"
                  value={this.state.phone_number}
                  onChange={this.onChange}
                />
              </div>
              <div>
                {this.props.cart_items.map(item => (
                  <div className="order-container-shoe" key={item._id}>
                    <div className="order-shoe-img-container">
                      <img
                        className="order-img"
                        src={item.url_main}
                        alt={item.shoeName}
                      />
                    </div>
                    <div className="order-shoe-prop-container">
                      <p className="order-shoe-name">
                        Shoe name - <span>{item.shoeName}</span>
                      </p>
                      <p className="order-shoe-price">
                        {" "}
                        Ksh. <span>{item.price}</span>
                      </p>
                      <p className="order-shoe-color">
                        {" "}
                        Color - <span>{item.color}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <label htmlFor="" className="method-payment-lable">
                Method of Payment
              </label>
              <div>
                <select
                  name="payment_method"
                  onChange={this.onChange}
                  className="order-select-payment"
                >
                  <option value="M-pesa">M-pesa</option>
                  <option value="Pay on Delivery">Pay on Delivery</option>
                </select>
                {this.state.payment_method === "M-pesa" ? (
                  <input
                    name="m_pesa_code"
                    value={this.state.m_pesa_code}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter M-pesa payment code"
                  />
                ) : null}
              </div>
              <input
                type="submit"
                className="place-order"
                value="Place your order"
              />
            </form>
          </div>

          {this.state.toggle ? (
            <div className="model-container">
              <div className={`model`}>
                <h3 className="model-title">
                  Select Your New Delivery Location
                </h3>
                <label htmlFor="" className="order-region-lable">
                  County
                </label>
                <div>
                  <select
                    name="county"
                    onChange={this.onChange}
                    className="order-select-location"
                  >
                    <option value="Nakuru">Nakuru</option>
                    <option value="Muran'ga">Muran'ga</option>
                  </select>
                </div>

                <label htmlFor="" className="order-region-lable">
                  Region
                </label>
                <div>
                  <select
                    name="region"
                    onChange={this.onChange}
                    className="order-select-location"
                  >
                    <option value="Gilgil">Gilgil</option>
                    <option value="Mukuyu">Mukuyu</option>
                  </select>
                </div>

                <label htmlFor="" className="order-region-lable">
                  Street
                </label>
                <div>
                  <select
                    name="street"
                    onChange={this.onChange}
                    className="order-select-location"
                  >
                    <option value="G.T.I">G.T.I</option>
                    <option value="Mukuyu town">Mukuyu Town</option>
                  </select>
                </div>
                <div className="btn-container-order">
                  <button
                    onClick={this.update}
                    className="btn-order-location-change"
                  >
                    Change
                  </button>
                  <button
                    onClick={this.toggle}
                    className="btn-order-location-change"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  cart_items: state.shoes.cart_items,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  order_palaced: state.shoes.cart_cleared
});
export default connect(
  mapStateToProps,
  { cartVisibility, searchBoxVisible, placeOrder }
)(Order);
