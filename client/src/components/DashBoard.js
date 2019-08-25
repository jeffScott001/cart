import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setFalse, cartVisibility } from "../actions/shoeActions";
import { Redirect } from "react-router-dom";

export class DashBoard extends Component {
  componentWillUnmount() {
    this.props.setFalse();
    this.props.cartVisibility(true);
  }
  render() {
    return (
      <div className="dashboard-container">
        {this.props.cleared ? null : <Redirect to="/" />}
        <h1 className="dashboard-text two">
          Thank You For Doing Business With Mama Ng'ash Shoe Shop
        </h1>
        <p className="dashboard-text one">
          Your order has been successfully placed
        </p>

        <p className="dashboard-text three">
          You will recieve an E-mail or Text regarding your order
        </p>
        <Link className="dashboard-link" to="/">
          Home
        </Link>
      </div>
    );
  }
}
const mapStatesToProps = state => ({
  cleared: state.shoes.cart_cleared
});
export default connect(
  mapStatesToProps,
  { setFalse, cartVisibility }
)(DashBoard);
