import React from "react";
import Banner from "./Banner";
import CustomerFeedback from "./CustomerFeedback";
import RestaurantBanner from "./RestaurantBanner";
import Products from "./Products";
import "./Home.css"; // Import file CSS

const Home = () => {
  return (
    <div className="home-container">
      <RestaurantBanner />
      <Banner />
      <CustomerFeedback />
      <Products />
    </div>
  );
};

export default Home;
