import React, { useState, useEffect, useRef } from "react";
import { foodData } from "./foodData";
import FoodItem from "./FoodItem";
import "./MenuStyle.css";

// Hàm loại bỏ dấu tiếng Việt
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

// Hàm lấy giá trị số từ chuỗi giá
const getPriceValue = (priceString) => {
  return parseInt(priceString.replace(/[^\d]/g, ""));
};

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [popularity, setPopularity] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // Danh mục món ăn
  const categories = ["All", ...new Set(foodData.map((food) => food.category))];

  // Mức giá
  const priceRanges = [
    { label: "All", value: "All" },
    { label: "Under 30,000 VND", value: "under30" },
    { label: "30,000 - 50,000 VND", value: "30to50" },
    { label: "50,000 - 100,000 VND", value: "50to100" },
    { label: "Over 100,000 VND", value: "over100" }
  ];

  // Độ phổ biến (giả định - trong thực tế nên lấy từ API)
  const popularityOptions = [
    { label: "All", value: "All" },
    { label: "Most Popular", value: "mostPopular" },
    { label: "Highest Rated", value: "highRated" },
    { label: "Newest", value: "newest" }
  ];


  // Tạo gợi ý tìm kiếm
  useEffect(() => {
    if (search.trim().length > 0) {
      const searchNoAccent = removeVietnameseTones(search).toLowerCase();
      
      // Tạo gợi ý từ tên món ăn
      const suggestions = foodData
        .filter(food => 
          removeVietnameseTones(food.name)
            .toLowerCase()
            .includes(searchNoAccent)
        )
        .map(food => food.name)
        .slice(0, 5); // Giới hạn 5 gợi ý
      
      // Thêm gợi ý từ danh mục nếu có kết quả phù hợp
      const categorySuggestions = categories
        .filter(category => 
          category !== "All" && 
          removeVietnameseTones(category)
            .toLowerCase()
            .includes(searchNoAccent)
        )
        .map(category => `Danh mục: ${category}`)
        .slice(0, 2); // Giới hạn 2 gợi ý danh mục

      setSearchSuggestions([...suggestions, ...categorySuggestions]);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  // Xử lý click bên ngoài để đóng gợi ý
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lọc món ăn theo từ khóa, danh mục, giá và độ phổ biến
  const filteredFoods = foodData.filter((food) => {
    const foodNameNoAccent = removeVietnameseTones(food.name).toLowerCase();
    const searchNoAccent = removeVietnameseTones(search).toLowerCase();
    const price = getPriceValue(food.price);

    // Lọc theo tên
    const matchesSearch = foodNameNoAccent.includes(searchNoAccent);
    
    // Lọc theo danh mục
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    
    // Lọc theo giá
    let matchesPrice = true;
    if (priceRange === "under30") {
      matchesPrice = price < 30000;
    } else if (priceRange === "30to50") {
      matchesPrice = price >= 30000 && price <= 50000;
    } else if (priceRange === "50to100") {
      matchesPrice = price > 50000 && price <= 100000;
    } else if (priceRange === "over100") {
      matchesPrice = price > 100000;
    }

    // Lọc theo độ phổ biến (giả định)
    let matchesPopularity = true;
    if (popularity === "mostPopular") {
      // Ví dụ: món ăn có id 1-5 được coi là phổ biến nhất
      matchesPopularity = food.id <= 5;
    } else if (popularity === "highRated") {
      // Ví dụ: món ăn có id chẵn được coi là đánh giá cao
      matchesPopularity = food.id % 2 === 0;
    } else if (popularity === "newest") {
      // Ví dụ: món ăn có id > 10 được coi là mới nhất
      matchesPopularity = food.id > 10;
    }

    return matchesSearch && matchesCategory && matchesPrice && matchesPopularity;
  });

  // Xử lý chọn gợi ý
  const handleSelectSuggestion = (suggestion) => {
    if (suggestion.startsWith("Danh mục:")) {
      const category = suggestion.replace("Danh mục: ", "");
      setSelectedCategory(category);
      setSearch("");
    } else {
      setSearch(suggestion);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="menu-container">
      {/* Thanh tìm kiếm và lọc */}
      <div className="search-filter-container">
        {/* Khung tìm kiếm với gợi ý */}
        <div className="search-container" ref={suggestionRef}>
          <input
            type="text"
            placeholder="Search for dishes..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          {/* Gợi ý tìm kiếm */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="search-suggestions">
              {searchSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thanh lọc giá */}
        <select
          className="filter-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>

        {/* Thanh lọc độ phổ biến */}
        <select
          className="filter-select"
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
        >
          {popularityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mục lục danh mục */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hiển thị bộ lọc đang áp dụng */}
      <div className="active-filters">
        {selectedCategory !== "All" && (
          <span className="filter-tag">
            Category: {selectedCategory}
            <button onClick={() => setSelectedCategory("All")}>×</button>
          </span>
        )}
        {priceRange !== "All" && (
          <span className="filter-tag">
            Price: {priceRanges.find(r => r.value === priceRange).label}
            <button onClick={() => setPriceRange("All")}>×</button>
          </span>
        )}
        {popularity !== "All" && (
          <span className="filter-tag">
            Sort by: {popularityOptions.find(o => o.value === popularity).label}
            <button onClick={() => setPopularity("All")}>×</button>
          </span>
        )}
      </div>


      {/* Danh sách món ăn */}
      <div className="food-list">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => <FoodItem key={food.id} food={food} />)
        ) : (
          <p className="no-result">No matching dishes found for your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;