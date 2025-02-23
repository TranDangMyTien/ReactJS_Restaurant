import React, { useState, useEffect } from "react";
import styled from "styled-components";
import foodYummy from "../../assets/Epsilon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);

  useEffect(() => {
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

  const toggleMenu = () => {
    setNavbarState(!navbarState);
  };

  return (
    <>
      <Nav>
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
          <li><a href="/" className="active">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#p">Contact</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#newsletter">Newsletter</a></li>
          <li><button className="reserve-button">Reserve</button></li>
        </ul>
      </Nav>

      <ResponsiveNav state={navbarState} className="responsive-nav">
        <div className="close-button" onClick={toggleMenu}>
          <VscChromeClose />
        </div>
        <ul>
          <li><a href="/" onClick={toggleMenu}>Home</a></li>
          <li><a href="#" onClick={toggleMenu}>Menu</a></li>
          <li><a href="#p" onClick={toggleMenu}>Contact</a></li>
          <li><a href="#products" onClick={toggleMenu}>Products</a></li>
          <li><a href="#newsletter" onClick={toggleMenu}>Newsletter</a></li>
          <li><button className="reserve-button" onClick={toggleMenu}>Reserve</button></li>
        </ul>
      </ResponsiveNav>
    </>
  );
}

const Nav = styled.nav`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;


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
        color: #fc4958;
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
          color: #f9c74f;
        }
      }
      .active {
        color: #f9c74f;
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
   
       gap: 10px;}
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
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  box-shadow: ${({ state }) => (state ? "-4px 0 10px rgba(0,0,0,0.1)" : "none")};
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
    transition: all 0.3s ease;

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
        transition: 0.1s ease-in-out;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
       
        &:hover {
          color: #fc4958;
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
    transition: 0.3s ease-in-out;
    letter-spacing: 0.1rem;


    &:hover {
      background-color: #f9c74f;
    }
  }
`;



