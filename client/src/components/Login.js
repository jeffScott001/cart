import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchBoxVisible, cartVisibility } from "../actions/shoeActions";
import { logIn } from "../actions/authActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
    success: null
  };
  componentDidMount() {
    this.props.searchBoxVisible(false);
    this.props.cartVisibility(false);
    if (this.props.success !== null) {
      this.setState({ success: this.props.success.msg });
    }
  }
  componentWillUnmount() {
    this.props.searchBoxVisible(true);
    this.props.cartVisibility(true);
  }
  componentDidUpdate(prevProps) {
    const error = this.props.error;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.props.logIn(user);
  };
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const error = this.state.msg;
    return (
      <div className="body-login">
        {isAuthenticated ? <Redirect to="/" /> : <Fragment />}

        <div className="register-container">
          <h2 className="register">
            <i className="fas fa-sign-in-alt" /> Sign in
          </h2>

          {this.state.success !== null ? (
            <p className="success-msg">{this.state.success}</p>
          ) : null}
          {error ? (
            <div className="error-container">
              <p className="error">{error.msg}</p>
            </div>
          ) : (
            <p />
          )}

          <form onSubmit={this.onSubmit} className="form-group-register">
            <label className="email" htmlFor="">
              Email
            </label>
            <input
              className="email-input"
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.onChange}
              placeholder="Enter your email"
            />

            <label className="password" htmlFor="">
              Password
            </label>
            <input
              className="password-input"
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.onChange}
              placeholder="Enter password"
            />

            <input type="submit" value="Log in" className="btn-submit" />
          </form>

          <div className="links">
            <Link className="link" to="/user/registration">
              Don't have an account?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  searchBoxVisible: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  success: PropTypes.object
};
const mapStatesToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
  success: state.auth.msg
});
export default connect(
  mapStatesToProps,
  { searchBoxVisible, logIn, cartVisibility }
)(Login);
