import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDetails } from "../actions/shoeActions";
import Details from "./Details";
import Selections from "./Selections";

export class ShoeDetails extends Component {
  state = {
    display: "",
    name: "",
    number: 0
  };

  componentDidMount() {
    this.setState({ display: this.props.details.url_main });
    window.scrollTo(0, 0);
    this.props.getDetails(this.props.match.params.id);

    this.interval = setInterval(() => {
      const { url_main, url_1, url_2, url_3, url_4 } = this.props.details;
      const urls = [url_main, url_1, url_2, url_3, url_4];
      this.counter();
      const number = this.state.number;
      const url = urls[number] !== "" ? urls[number] : url_2;
      const name = ["img1", "img2", "img3", "img4", "img5"];

      this.setState({
        display: url,
        name: name[number]
      });
    }, 5000);
  }

  // componentDidUpdate(prevProp) {
  //   if (prevProp.details.url_main !== this.props.details.url_main) {

  //   }
  // }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  counter = () => {
    let number = this.state.number;
    if (number === 4) {
      number = -1;
    }
    number++;
    this.setState({ number });
  };

  onClick = e => {
    const url = e.target.src;
    const name = e.target.name;
    this.setState({
      display: url,
      name: name
    });
  };

  render() {
    const item = this.props.details;
    const display = this.state.display;
    return (
      <div className="details-container">
        <h1>{item.shoeName}</h1>
        <div className="display">
          <img
            src={display}
            alt=""
            className={`img-display ${this.state.name}`}
            onClick={this.onClick}
          />
        </div>

        <div className="details-img-container">
          <div
            className="img-container"
            style={
              display === item.url_main
                ? { border: "3px solid #1e90ff", borderRadius: "3px" }
                : { border: "none" }
            }
          >
            <img
              name="img1"
              src={item.url_main}
              className="details-img"
              alt={item.shoeType}
              onClick={this.onClick}
            />
          </div>

          {item.url_1 !== "" ? (
            <div
              className="img-container"
              style={
                display === item.url_1
                  ? { border: "3px solid #1e90ff", borderRadius: "3px" }
                  : { border: "none" }
              }
            >
              <img
                name="img2"
                src={item.url_1}
                className="details-img"
                alt={item.shoeType}
                onClick={this.onClick}
              />
            </div>
          ) : null}

          {item.url_2 !== "" ? (
            <div
              className="img-container"
              style={
                display === item.url_2
                  ? { border: "3px solid #1e90ff", borderRadius: "3px" }
                  : { border: "none" }
              }
            >
              <img
                name="img3"
                src={item.url_2}
                className="details-img"
                alt={item.shoeType}
                onClick={this.onClick}
              />
            </div>
          ) : null}

          {item.url_3 !== "" ? (
            <div
              className="img-container"
              style={
                display === item.url_3
                  ? { border: "3px solid #1e90ff", borderRadius: "3px" }
                  : { border: "none" }
              }
            >
              <img
                name="img4"
                src={item.url_3}
                className="details-img"
                alt={item.shoeType}
                onClick={this.onClick}
              />
            </div>
          ) : null}

          {item.url_4 !== "" ? (
            <div
              className="img-container"
              style={
                display === item.url_4
                  ? { border: "3px solid #1e90ff", borderRadius: "3px" }
                  : { border: "none" }
              }
            >
              <img
                name="img5"
                src={item.url_4}
                className="details-img"
                alt={item.shoeType}
                onClick={this.onClick}
              />
            </div>
          ) : null}
        </div>
        <Selections item={item} />
        <Details item={item} />
      </div>
    );
  }
}
ShoeDetails.propTyoes = {
  details: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  details: state.shoes.item
});

export default connect(
  mapStateToProps,
  { getDetails }
)(ShoeDetails);
