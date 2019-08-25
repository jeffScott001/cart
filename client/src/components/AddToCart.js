import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../actions/shoeActions";

export class AddToCart extends Component {
  state = {
    msg: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.shoe.color !== null) {
      this.interval = setTimeout(() => {
        this.setState({
          msg: "invisible"
        });
      }, 1000);
    }
    if (this.props.shoe.color === null && this.props.shoe.size === null) {
      setTimeout(() => {
        this.setState({
          msg: ""
        });
      }, 0);
    }
    if (prevProps.shoe.unique !== this.props.shoe.unique) {
      if (this.props.shoe.color !== null) {
        const {
          _id,
          color,
          shoeName,
          size,
          url_main,
          price,
          unique
        } = this.props.shoe;
        const item = {
          shoeId: _id,
          color,
          shoeName,
          size,
          url_main,
          price,
          _id: unique
        };
        this.props.addToCart(item);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { color } = this.props.shoe;

    return (
      <div>
        {color !== null ? (
          <p className={`success ${this.state.msg}`}>Successfully Added</p>
        ) : (
          <p />
        )}
      </div>
    );
  }
}
AddToCart.propTypes = {
  shoe: PropTypes.object
};

export default connect(
  null,
  { addToCart }
)(AddToCart);
