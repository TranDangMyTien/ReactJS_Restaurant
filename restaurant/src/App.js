import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ScrollToTop from "./components/Home/ScrollToTop";
import MenuPage from "./components/Menu/MenuPage";
import Contact from "./components/Contact/Contact";
import { useState, useEffect } from "react";
import FloatingContactButtons from "./components/Contact/FloatingContactButtons";

function App() {
  const [showContactIcons, setShowContactIcons] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Hiển thị icon khi người dùng cuộn xuống khoảng 200px
      if (window.scrollY > 200) {
        setShowContactIcons(true);
      } else {
        setShowContactIcons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
        <FloatingContactButtons visible={showContactIcons} />
      </div>
    </BrowserRouter>
  );
}

export default App;