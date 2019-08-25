import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Loggers extends Component {
  state = {
    name: null
  };
  onClick = () => {
    this.props.logOut();
    document.location.reload();
  };

  componentDidUpdate(prevProp) {
    if (this.props.user.isAuthenticated) {
      if (this.props.user !== prevProp.user) {
        this.setState({ name: this.props.user.user.sur_name });
      }
    }
  }
  render() {
    const isAuthenticated = this.props.user.isAuthenticated;

    if (isAuthenticated) {
      return (
        <Fragment>
          <span className="user-name"> Welcome {this.state.name}</span>
          <Link
            to="#"
            onClick={this.onClick}
            className="btn-loggers btn-logout"
          >
            Logout
          </Link>
        </Fragment>
      );
    } else {
      return (
        <div>
          <Link to="/user/login" className="btn-loggers btn-login">
            Login
          </Link>

          <Link to="/user/registration" className="btn-loggers btn-register">
            Register
          </Link>
        </div>
      );
    }
  }
}
Loggers.propType = {
  logOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth
});
export default connect(
  mapStateToProps,
  { logOut }
)(Loggers);
