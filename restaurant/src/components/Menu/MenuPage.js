import React, { useState } from "react";
import { foodData } from "./foodData";
import FoodItem from "./FoodItem";
import "./MenuStyle.css"; // Import CSS riêng

// Hàm loại bỏ dấu tiếng Việt
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Danh mục món ăn (thêm "Tất cả")
  const categories = ["Tất cả", ...new Set(foodData.map((food) => food.category))];

  // Lọc món ăn theo từ khóa hoặc danh mục
  const filteredFoods = foodData.filter((food) => {
    const foodNameNoAccent = removeVietnameseTones(food.name).toLowerCase();
    const searchNoAccent = removeVietnameseTones(search).toLowerCase();

    const matchesSearch = foodNameNoAccent.includes(searchNoAccent);
    const matchesCategory = selectedCategory === "Tất cả" || food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="menu-container">
      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm món ăn..."
        className="search-bar"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedCategory("Tất cả"); // Reset danh mục khi tìm kiếm
        }}
      />

      {/* Mục lục danh mục */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(category);
              setSearch(""); // Xóa tìm kiếm khi chọn danh mục
            }}
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
