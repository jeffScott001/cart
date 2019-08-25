import React, { Component } from "react";

export class Details extends Component {
  render() {
    const item = this.props.item;
    return (
      <div className="datails-container">
        <p className="shoe-category-detail">
          Category: <span className="s1">{item.category}</span>
        </p>
        <p className="shoe-price-detail">
          Price - <span className="s2">Ksh: {item.price}</span>
        </p>
        <p className="shoe-type-detail">
          Type: <span className="s3">{item.shoeType}</span>
        </p>
        <p className="shoe-brand-detail">
          Brand: <span className="s4">{"Bata Shoe Company"}</span>
        </p>

        <p className="title-sizes">Available Sizes</p>
        <ul className="sizes">
          {item.size !== undefined
            ? item.size.map(num => (
                <li className="shoe-sizes" key={num}>
                  {num}
                </li>
              ))
            : null}
        </ul>

        <p className="title-colors">Available Shoe Colors</p>
        <ul className="colors">
          {item.colors !== undefined
            ? item.colors.map(color => (
                <li className="shoe-colors" key={color}>
                  {color}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default Details;
