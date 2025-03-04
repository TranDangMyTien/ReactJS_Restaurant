import React, { useState, useEffect } from "react";
import styled from "styled-components";
import foodYummy from "../../assets/Epsilon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Lấy đường dẫn hiện tại và set active link tương ứng khi component mount
    const path = window.location.pathname;
    if (path === "/") setActiveLink("home");
    else if (path === "/menu") setActiveLink("menu");
    else if (path.includes("contact")) setActiveLink("contact");
    else if (path.includes("reservation")) setActiveLink("reservation");
    else if (path.includes("promotion")) setActiveLink("specialties");

    const handleOutsideClick = (e) => {
      // Chỉ đóng menu khi click bên ngoài và menu đang mở
      if (
        navbarState &&
        !e.target.closest(".responsive-nav") &&
        !e.target.closest(".toggle")
      ) {
        setNavbarState(false);
      }
    };

    // Chỉ thêm event listener khi menu đang mở
    if (navbarState) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarState]);

  const toggleMenu = () => {
    setNavbarState((prev) => !prev);
  };

  // Hàm xử lý khi click vào link
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    if (navbarState) {
      setNavbarState(false); // Đóng menu responsive nếu đang mở
    }
  };

  return (
    <>
      <Nav scrolled={scrolled}>
        <div className="container">
          <div className="brand">
            <img src={foodYummy} alt="Logo" />
          </div>
          <div className="nav-right">
            <ul className="links">
              <li>
                <a 
                  href="/" 
                  className={activeLink === "home" ? "active" : ""}
                  onClick={() => handleLinkClick("home")}
                >
                  HOME
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeLink === "promotion" ? "active" : ""}
                  onClick={() => handleLinkClick("promotion")}
                >
                PROMOTION
                </a>
              </li>
              <li>
                <a 
                  href="/menu" 
                  className={activeLink === "menu" ? "active" : ""}
                  onClick={() => handleLinkClick("menu")}
                >
                  MENU
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeLink === "reservation" ? "active" : ""}
                  onClick={() => handleLinkClick("reservation")}
                >
                  RESERVATION
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className={activeLink === "contact" ? "active" : ""}
                  onClick={() => handleLinkClick("contact")}
                >
                  CONTACT
                </a>
              </li>
            </ul>
            <div className="cart-and-order">
              <div className="cart-icon">
                <FaShoppingCart />
              </div>
              <button className="order-now-btn">ORDER NOW</button>
            </div>
          </div>
          <div className="toggle" onClick={toggleMenu}>
            {navbarState ? (
              <VscChromeClose className="toggle-icon" />
            ) : (
              <GiHamburgerMenu className="toggle-icon" />
            )}
          </div>
        </div>
      </Nav>

      <ResponsiveNav state={navbarState} className="responsive-nav">
        <ul>
          <li>
            <a 
              href="/" 
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              HOME
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeLink === "promotion" ? "active" : ""}
              onClick={() => handleLinkClick("promotion")}
            >
              PROMOTION
            </a>
          </li>
          <li>
            <a 
              href="/menu" 
              className={activeLink === "menu" ? "active" : ""}
              onClick={() => handleLinkClick("menu")}
            >
              MENU
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeLink === "reservation" ? "active" : ""}
              onClick={() => handleLinkClick("reservation")}
            >
              RESERVATION
            </a>
          </li>
          <li>
            <a 
              href="/contact" 
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => handleLinkClick("contact")}
            >
              CONTACT
            </a>
          </li>
          <li className="cart-and-order-mobile">
            <div className="cart-icon">
              <FaShoppingCart />
            </div>
            <button className="order-now-btn">ORDER NOW</button>
          </li>
        </ul>
      </ResponsiveNav>
    </>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ scrolled }) => (scrolled ? "rgba(0, 0, 0, 0.9)" : "transparent")};
  transition: background-color 0.4s ease-in-out;
  z-index: 1000;
  padding: 15px 0;
  
  .container {
    width: 100%;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .brand {
    display: flex;
    align-items: center;
    
    img {
      height: 40px;
      cursor: pointer;
    }
  }

  .toggle {
    display: none;
    cursor: pointer;
    
    .toggle-icon {
      font-size: 1.5rem;
      color: #f9c74f;
      width: 40px;
      height: 40px;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .toggle-icon:hover {
      color: #fc4958;
      background-color: rgba(252, 73, 88, 0.2);
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }

  .links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        color: #f9c74f;
        font-weight: 400;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: 0.3s ease-in-out;
        padding: 5px 0;
        position: relative;
        
        &:hover {
          color: #fc4958;
        }
        
        &.active {
          color: #fc4958;
        }
        
        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #fc4958;
          transition: width 0.3s ease;
        }
        
        &:hover::after {
          width: 100%;
        }
      }
    }
  }

  .cart-and-order {
    display: flex;
    align-items: center;
    margin-left: 2rem;
    
    .cart-icon {
      font-size: 1.5rem;
      color: #f9c74f;
      cursor: pointer;
      margin-right: 1rem;
      transition: 0.3s ease;
      
      &:hover {
        color: #fc4958;
      }
    }
    
    .order-now-btn {
      background-color: #fc4958;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #e63946;
        box-shadow: 0 2px 8px rgba(230, 57, 70, 0.4);
      }
    }
  }
  
  @media screen and (max-width: 1080px) {
    .container {
      padding: 0 5%;
    }
    
    .brand {
      flex: 0;
    }
    
    .toggle {
      display: flex;
    }
    
    .nav-right {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: ${({ state }) => (state ? "0" : "-100vw")};
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.95);
  height: 100vh;
  width: 70%;
  transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;

  ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin-top: 2rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;

      a {
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        transition: 0.3s ease-in-out;
        text-align: center;
        letter-spacing: 1px;
        
        &:hover {
          color: #fc4958;
        }
        
        &.active {
          color: #f9c74f;
          font-weight: bold;
        }
      }
    }

    .cart-and-order-mobile {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.5rem;
      
      .cart-icon {
        font-size: 1.5rem;
        color: #f9c74f;
        margin-bottom: 1rem;
        transition: 0.3s ease;
        
        &:hover {
          color: #fc4958;
        }
      }
      
      .order-now-btn {
        background-color: #fc4958;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: #e63946;
        }
      }
    }
  }
`;