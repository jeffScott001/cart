import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getDetails,
  searchBoxVisible
  // getCartItems
} from "../actions/shoeActions";
import MainPageSelections from "./MainPageSelections";

export class Shoes extends Component {
  componentDidMount() {
    this.props.searchBoxVisible(true);
    document.addEventListener("scroll", this.hundleScroll);
    // this.props.getCartItems();
  }

  onScroll = e => {};

  render() {
    const { items } = this.props.shoes;
    return (
      <div className="container">
        <p className="body-text">
          Free delivery{" | "}
          <span className="body-text-sec">
            Select Shoes from the list and add it to the cart
          </span>
        </p>
        <div className="shoes">
          {items.map(item => (
            <div className="shoe-container" key={item._id}>
              <MainPageSelections item={item} />
              <div className="height">
                <img
                  className="shoe-image"
                  src={item.url_main}
                  alt={item.shoeName}
                />
              </div>

              <Link className="shoe-link" to={`/shoe/${item._id}`}>
                <p className="shoe">
                  {item.shoeName} -{" "}
                  <span className="shoe-price">Ksh: {item.price}</span>
                </p>
                <p className="shoe-brand">
                  Bata | <span className="shoe-category">{item.category}</span>
                </p>

                <p className="shoe-type">{item.shoeType}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
Shoes.propTypes = {
  shoes: PropTypes.object.isRequired,
  getDetails: PropTypes.func.isRequired,
  searchBoxVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shoes: state.shoes
});

export default connect(
  mapStateToProps,
  { getDetails, searchBoxVisible }
)(Shoes);
