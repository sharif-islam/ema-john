import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import "./Shop.css";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://immense-falls-41118.herokuapp.com/products")
      .then((Res) => Res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    fetch("https://immense-falls-41118.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKey),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => pd === product);
    let newCart;
    let count = 1;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd !== product);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCard={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container"></div>
      <Cart cart={cart}>
        <Link to="/review">
          <button className="main-button">
            {" "}
            <FontAwesomeIcon icon={faShoppingCart} />
            Review Order
          </button>
        </Link>
      </Cart>
    </div>
  );
};

export default Shop;
