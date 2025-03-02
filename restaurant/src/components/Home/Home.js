import React from "react";
import Banner from "./Banner";
import Services from "./Services";
import ZoomBanner from "./ZoomBanner";
import Products from "./Products";
import "./Home.css"; // Import file CSS

const Home = () => {
  return (
    <div className="home-container">
      <Banner />
      <Services />
      <ZoomBanner />
      <Products />
    </div>
  );
};

export default Home;
