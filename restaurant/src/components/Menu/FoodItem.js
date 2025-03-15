import React, { useState } from "react";
import "./FoodItem.css";
import OrderModal from "../Home/OrderModal";

const FoodItem = ({ food }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="food-card" onClick={openModal}>
        <img src={food.image} alt={food.name} className="food-image" />
        <div className="food-info">
          <h3 className="food-name">{food.name}</h3>
          <p className="food-description">{food.description}</p>
          <div className="food-price">{food.price}</div>
        </div>
      </div>
      
      <OrderModal 
        isOpen={isModalOpen} 
        product={food} 
        onClose={closeModal} 
      />
    </>
  );
};

export default FoodItem;