import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ScrollToTop from "./components/Home/ScrollToTop";
import MenuPage from "./components/Menu/MenuPage";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
