import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">
          {" "}
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>$ {price}</p>
        <p>
          <small>Only {stock} left in a stock.</small>
        </p>
        {props.showAddToCard && (
          <button
            onClick={() => props.handleAddProduct(props.product)}
            className="main-button"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
