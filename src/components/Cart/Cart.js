import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce((total, pd) => total + pd.price, 0);

  let shipping = 0;
  if (total > 100) {
    shipping = 0;
  } else if (total > 50) {
    shipping = 6.3;
  } else if (total > 35) {
    shipping = 8.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  const tax = total * 0.1;

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Ordered : {cart.length}</p>
      <p>product Price : {total.toFixed(2)}</p>
      <p>
        <small>Shipping Cost : {shipping.toFixed(2)}</small>
      </p>
      <p>
        {" "}
        <small>tax+VAT : {tax.toFixed(2)}</small>{" "}
      </p>
      <p>total Price : {(total + tax + shipping).toFixed(2)}</p>
    </div>
  );
};

export default Cart;
