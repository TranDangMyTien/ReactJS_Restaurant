import React, { useState } from "react";
import { foodData } from "./foodData";
import FoodItem from "./FoodItem";
import "./MenuStyle.css"; // Import CSS riêng

const MenuPage = () => {
  console.log("foodData:", foodData);

  const [search, setSearch] = useState("");

  // Danh mục món ăn
  const categories = foodData
    ? [...new Set(foodData.map((food) => food.category))]
    : [];

  // Lọc món ăn theo từ khóa
  const filteredFoods = foodData
    ? foodData.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="menu-container">
      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm món ăn..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Mục lục danh mục */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className="category-btn"
            onClick={() => setSearch(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <div className="food-list">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => <FoodItem key={food.id} food={food} />)
        ) : (
          <p className="no-result">Không tìm thấy món ăn nào.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
