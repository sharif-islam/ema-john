import React from "react";

const Inventory = () => {
  const product = {};
  const handleAddProduct = () => {
    fetch("https://immense-falls-41118.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <form action="">
        <p>
          <span>Name : </span>
          <input type="text" />
        </p>
        <p>
          <span>price : </span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity : </span>
          <input type="text" />
        </p>
        <p>
          <span>Product Image : </span>
          <input type="file" />
        </p>
        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
