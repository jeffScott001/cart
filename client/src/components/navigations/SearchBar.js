import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class SearchBar extends Component {
  state = {
    value: "",
    box: "",
    link: ""
  };
  componentDidUpdate(prevProp) {
    if (prevProp.isVisible !== this.props.isVisible) {
      this.onChange();
    }
  }
  onChange = () => {
    if (this.props.isVisible) {
      this.setState({
        box: "active",
        link: "inactive"
      });
    } else {
      this.setState({
        box: "inactive",
        link: "active"
      });
    }
  };
  render() {
    return (
      <Fragment>
        <div className={`search-bar-container ${this.state.box}`}>
          <input className="search-bar" placeholder="Search..." type="text" />
          <i className="fas fa-search" />
        </div>

        <Link className={`home-route-btn ${this.state.link}`} to="/">
          <i className="fas fa-chevron-circle-left" /> Home
        </Link>
      </Fragment>
    );
  }
}

SearchBar.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isVisible: state.shoes.isVisible
});

export default connect(
  mapStateToProps,
  {}
)(SearchBar);
