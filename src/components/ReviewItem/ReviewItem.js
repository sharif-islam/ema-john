import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, price } = props.product;
  const reviewStyle = {
    borderBottom: "1px solid lightgray",
    paddingTop: "30px",
    paddingBottom: "30px",
  };
  return (
    <div style={reviewStyle}>
      <h6>Name : {name}</h6>
      <h2>Price : {price}</h2>
      <p>Quantity : {quantity}</p>
      <button
        onClick={() => props.handleRemoveProduct(props.product)}
        className="main-button"
      >
        Remove Item
      </button>
    </div>
  );
};

export default ReviewItem;
