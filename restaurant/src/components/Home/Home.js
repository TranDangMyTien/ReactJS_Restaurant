import React from "react";
import Banner from "./Banner";
import CustomerFeedback from "./CustomerFeedback";
import RestaurantBanner from "./RestaurantBanner";
import Products from "./Products";
import "./Home.css"; // Import file CSS
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div className="home-container">
      <RestaurantBanner />
      <Banner />
      <CustomerFeedback />
      <Products />
      <Contact />
    </div>
  );
};

export default Home;
