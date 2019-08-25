import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchBoxVisible, cartVisibility } from "../actions/shoeActions";
import { register } from "../actions/authActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export class Register extends Component {
  state = {
    fName: "",
    surName: "",
    lName: "",
    email: "",
    password: "",
    password2: "",
    county: "",
    region: "",
    street: "",
    phoneNumber: "",
    msg: null
  };
  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      if (this.props.error.id === "REGISTER_FAIL") {
        this.setState({ msg: this.props.error.msg });
      }
    }
  }
  componentDidMount() {
    this.props.searchBoxVisible(false);
    this.props.cartVisibility(false);
  }
  componentWillUnmount() {
    this.props.searchBoxVisible(true);
    this.props.cartVisibility(true);
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const {
      fName,
      surName,
      lName,
      email,
      password,
      password2,
      county,
      region,
      street,
      phoneNumber
    } = this.state;
    const user_details = {
      first_name: fName,
      last_name: lName,
      sur_name: surName,
      email,
      password,
      password2,
      county,
      region,
      street,
      phone_number: phoneNumber
    };
    this.props.register(user_details);
  };
  render() {
    const success = this.props.success;
    const error = this.state.msg;

    return (
      <div className="body">
        {success !== null ? <Redirect to="/user/login" /> : <Fragment />}
        <div className="register-container">
          <h2 className="register">
            <i className="fas fa-user-plus" /> Register
          </h2>
          <div />
          <div className="form-group-register-container">
            {error ? (
              <div className="error-container">
                <p className="error">{error.msg}</p>
              </div>
            ) : (
              <p />
            )}
            <form className="form-group-register" onSubmit={this.onSubmit}>
              <label className="fname" htmlFor="">
                First Name
              </label>
              <input
                className="fname-input"
                type="text"
                value={this.state.fName}
                name="fName"
                onChange={this.onChange}
                placeholder="Enter your first name"
              />

              <label className="surname" htmlFor="">
                Surname
              </label>
              <input
                className="surname-input"
                type="text"
                value={this.state.surName}
                name="surName"
                onChange={this.onChange}
                placeholder="Enter your surname"
              />

              <label className="lname" htmlFor="">
                Last Name
              </label>
              <input
                className="lname-input"
                type="text"
                value={this.state.lName}
                name="lName"
                onChange={this.onChange}
                placeholder="Enter your last name"
              />
              <div className="contacts-container">
                <div className="contact-contianer">
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
                </div>
                <div className="contact-contianer">
                  <label className="phone-number" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    className="phone-input"
                    type="text"
                    value={this.state.phoneNumber}
                    name="phoneNumber"
                    onChange={this.onChange}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="passwords-container">
                <div className="password-container">
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
                </div>

                <div className="password-container">
                  <label className="password2" htmlFor="">
                    confirm Password
                  </label>
                  <input
                    className="password2-input"
                    type="password"
                    value={this.state.password2}
                    name="password2"
                    onChange={this.onChange}
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <label className="county" htmlFor="">
                County
              </label>
              <input
                className="county-input"
                type="text"
                value={this.state.county}
                name="county"
                onChange={this.onChange}
                placeholder="Enter your current county"
              />

              <label className="region" htmlFor="">
                Region
              </label>
              <input
                className="region-input"
                type="text"
                value={this.state.region}
                name="region"
                onChange={this.onChange}
                placeholder="Enter your current region"
              />

              <label className="street" htmlFor="">
                street
              </label>
              <input
                className="street-input"
                type="text"
                name="street"
                onChange={this.onChange}
                value={this.state.street}
                placeholder="Enter your current street"
              />
              <input type="submit" value="Sign Up" className="btn-submit" />
            </form>
            <div className="links">
              <Link className="link" to="/user/login">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  searchBoxVisible: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  success: PropTypes.object
};
const mapStatesToProps = state => ({
  error: state.errors,
  success: state.auth.msg
});
export default connect(
  mapStatesToProps,
  { searchBoxVisible, register, cartVisibility }
)(Register);
