import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
const Review = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };
  const [cart, setCart] = useState([]);
  const handleRemoveProduct = (product) => {
    const remainingProduct = cart.filter((pd) => pd !== product);
    setCart(remainingProduct);
    removeFromDatabaseCart(product.key);
  };
  let thankyou;
  if (orderPlaced) thankyou = <img src={happyImage} alt="" />;
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cardProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });

    setCart(cardProducts);
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
        {thankyou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="main-button">
            {" "}
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
