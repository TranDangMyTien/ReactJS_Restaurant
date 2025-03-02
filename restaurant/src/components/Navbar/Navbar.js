import React, { useState, useEffect } from "react";
import styled from "styled-components";
import foodYummy from "../../assets/Epsilon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Lấy đường dẫn hiện tại và set active link tương ứng khi component mount
    const path = window.location.pathname;
    if (path === "/") setActiveLink("home");
    else if (path === "/menu") setActiveLink("menu");
    else if (path.includes("contact")) setActiveLink("contact");
    else if (path.includes("products")) setActiveLink("products");
    else if (path.includes("newsletter")) setActiveLink("newsletter");

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

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navbarState]); // Thêm navbarState vào dependencies

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < scrollY || currentScrollY < 10);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const toggleMenu = () => {
    setNavbarState(!navbarState);
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
      <Nav className={visible ? "visible" : "hidden"}>
        <div className="brand">
          <img src={foodYummy} alt="Icon" />
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={toggleMenu} />
            ) : (
              <GiHamburgerMenu onClick={toggleMenu} />
            )}
          </div>
        </div>
        <ul className="links">
          <li>
            <a 
              href="/" 
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="" 
              className={activeLink === "products" ? "active" : ""}
              onClick={() => handleLinkClick("products")}
            >
              Promotion
            </a>
          </li>
          <li>
            <a 
              href="/menu" 
              className={activeLink === "menu" ? "active" : ""}
              onClick={() => handleLinkClick("menu")}
            >
              Menu
            </a>
          </li>
          <li>
            <a 
              href="" 
              className={activeLink === "newsletter" ? "active" : ""}
              onClick={() => handleLinkClick("newsletter")}
            >
              Reservation
            </a>
          </li>
          <li>
            <a 
              href="/contact" 
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => handleLinkClick("contact")}
            >
              Contact us
            </a>
          </li>
          <li>
            <button className="reserve-button">Order now</button>
          </li>
        </ul>
      </Nav>

      <ResponsiveNav state={navbarState} className="responsive-nav">
        <div className="close-button" onClick={toggleMenu}>
          <VscChromeClose />
        </div>
        <ul>
          <li>
            <a 
              href="/" 
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/menu" 
              className={activeLink === "menu" ? "active" : ""}
              onClick={() => handleLinkClick("menu")}
            >
              Menu
            </a>
          </li>
          <li>
            <a 
              href="/contact" 
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => handleLinkClick("contact")}
            >
              Contact
            </a>
          </li>
          <li>
            <a 
              href="#products" 
              className={activeLink === "products" ? "active" : ""}
              onClick={() => handleLinkClick("products")}
            >
              Products
            </a>
          </li>
          <li>
            <a 
              href="#newsletter" 
              className={activeLink === "newsletter" ? "active" : ""}
              onClick={() => handleLinkClick("newsletter")}
            >
              Newsletter
            </a>
          </li>
          <li>
            <button className="reserve-button">Reserve</button>
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
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.6s ease-in-out, background-color 0.6s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0 4vw;
  z-index: 1000;
  
  &.hidden {
    transform: translateY(-100%);
    transition: transform 0.8s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  &.visible {
    transform: translateY(0);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .brand {
    display: flex;
    align-items: center;
    img {
      margin-top: 1rem;
      cursor: pointer;
    }
    .toggle {
      display: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: white;
      .hidden {
        display: none;
      }
    }
  }

  .links {
    display: flex;
    list-style: none;
    gap: 2rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        color: #f9c74f;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        transition: 0.3s ease-in-out;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        &:hover {
          color: #fc4958;
        }
      }
      .active {
        color: #fc4958;
      }
    }

    .reserve-button {
      background-color: #fc4958;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      letter-spacing: 0.1rem;

      &:hover {
        background-color: #f9c74f;
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .links {
      gap: 10px;
    }
  }

  @media screen and (max-width: 1080px) {
    .brand {
      width: 100%;
      justify-content: space-between;
      .toggle {
        display: block;
      }
    }
    .links {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: ${({ state }) => (state ? "0" : "-100vw")};
  top: 0;
  z-index: 10;
  background-color: white;
  height: 100vh;
  width: 60%;
  transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  box-shadow: ${({ state }) =>
    state ? "-4px 0 10px rgba(0,0,0,0.1)" : "none"};
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.8rem;
    cursor: pointer;
    color: #fc4958;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.5s ease;

    &:hover {
      background-color: rgba(252, 73, 88, 0.1);
      transform: rotate(90deg);
    }
  }

  ul {
    list-style: none;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin-bottom: 1rem;

      a {
        text-decoration: none;
        color: #f9c74f;
        font-size: 1.2rem;
        transition: 0.3s ease-in-out;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &:hover {
          color: #fc4958;
        }
        
        &.active {
          color: #fc4958; /* Màu active cho menu responsive */
          font-weight: bold;
        }
      }
    }
  }

  .reserve-button {
    background-color: #fc4958;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 2rem;
    transition: 0.5s ease-in-out;
    letter-spacing: 0.1rem;

    &:hover {
      background-color: #f9c74f;
    }
  }
`;