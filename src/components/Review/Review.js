import React, { useEffect, useState } from "react";

import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { useHistory } from "react-router-dom";
const Review = () => {
  const history = useHistory();
  const handleProceedCheckOut = () => {
    history.push("/shipment");
  };
  const [cart, setCart] = useState([]);
  const handleRemoveProduct = (product) => {
    const remainingProduct = cart.filter((pd) => pd !== product);
    setCart(remainingProduct);
    removeFromDatabaseCart(product.key);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://immense-falls-41118.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            handleRemoveProduct={handleRemoveProduct}
            product={pd}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckOut} className="main-button">
            {" "}
            Proceed CheckOut
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
