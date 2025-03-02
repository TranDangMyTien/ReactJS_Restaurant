import React from "react";
import Banner from "./Banner";
import Services from "./Services";
import RestaurantBanner from "./RestaurantBanner";
import Products from "./Products";
import "./Home.css"; // Import file CSS

const Home = () => {
  return (
    <div className="home-container">
      <RestaurantBanner />
      <Banner />
      <Services />
      <Products />
    </div>
  );
};

export default Home;
