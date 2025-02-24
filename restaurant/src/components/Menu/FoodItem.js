import React from "react";
import "./FoodItem.css"; // Import CSS riêng

const FoodItem = ({ food }) => {
  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-image" />
      <div className="food-info">
        <h3 className="food-name">{food.name}</h3>
        <p className="food-description">{food.description}</p>
        <div className="food-price">{food.price}</div>
      </div>
    </div>
  );
};

export default FoodItem;
