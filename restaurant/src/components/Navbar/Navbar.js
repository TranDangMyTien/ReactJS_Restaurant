import React, { useState, useEffect } from "react";
import styled from "styled-components";
import foodYummy from "../../assets/Epsilon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

   // Tính toán offset chính xác dựa trên chiều cao của navbar
   const getNavbarHeight = () => {
    const navElement = document.querySelector('nav');
    return navElement ? navElement.offsetHeight : 80; // 80px là giá trị mặc định nếu không tìm thấy nav
  };


  // Hàm scrollToProducts được cải tiến để xử lý cuộn chính xác hơn
  const scrollToProducts = (attemptCount = 0) => {
    // Tăng thời gian chờ cho lần render đầu tiên
    const delay = attemptCount === 0 ? 600 : 300;
    
    setTimeout(() => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        // Tính toán vị trí cần cuộn đến
        const navbarHeight = getNavbarHeight();
        const elementPosition = productsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Thêm 20px đệm
        
        // Sử dụng scrollTo thay vì scrollIntoView để kiểm soát tốt hơn
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else if (attemptCount < 3) {
        // Thử lại tối đa 3 lần nếu không tìm thấy phần tử
        scrollToProducts(attemptCount + 1);
      }
    }, delay);
  };

   // Thêm hàm scrollToContact tương tự như scrollToProducts
   const scrollToContact = (attemptCount = 0) => {
    // Tạo độ trễ cho lần thực thi đầu tiên hoặc lần thử lại
    const delay = attemptCount === 0 ? 600 : 300;
    
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        // Tính toán vị trí cuộn chính xác
        const navbarHeight = getNavbarHeight();
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else if (attemptCount < 3) {
        // Thử lại tối đa 3 lần nếu không tìm thấy phần tử
        scrollToContact(attemptCount + 1);
      }
    }, delay);
  };

  useEffect(() => {
    // Lấy đường dẫn hiện tại và set active link tương ứng khi component mount
    const path = window.location.pathname;
    if (path === "/") setActiveLink("home");
    else if (path === "/menu") setActiveLink("menu");
    else if (path.includes("contact") || window.location.hash === "#contact") setActiveLink("contact");
    else if (path.includes("reservation")) setActiveLink("reservation");
    else if (path.includes("promotion") || path.includes("#products")) setActiveLink("promotion");

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

    // Kiểm tra hash khi component mount hoặc cập nhật
    if (window.location.hash === "#products") {
      // Đợi lâu hơn khi trang mới load
      setTimeout(() => {
        scrollToProducts();
      }, 300);
    } else if (window.location.hash === "#contact") {
      // Thêm xử lý cho hash contact
      setTimeout(() => {
        scrollToContact();
      }, 300);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarState]);



  const toggleMenu = () => {
    setNavbarState((prev) => !prev);
  };

  // Hàm xử lý khi click vào link
  // Cải thiện hàm xử lý khi click vào link
  const handleLinkClick = (linkName, event) => {
    setActiveLink(linkName);
    if (navbarState) {
      setNavbarState(false);
    }
    
    // Xử lý cho promotion
    if (linkName === "promotion") {
      // Ngăn chặn hành vi mặc định
      if (event) {
        event.preventDefault();
      }
      
      if (window.location.pathname === "/") {
        // Nếu đã ở trang chủ, cuộn đến section products với độ trễ ngắn
        setTimeout(() => {
          scrollToProducts();
        }, 100);
      } else {
        // Nếu không ở trang chủ, điều hướng về trang chủ với hash #products
        navigate("/#products");
        
        // Tạo một biến để kiểm tra xem đã cuộn chưa
        let hasScrolled = false;
        
        // Lắng nghe sự kiện load hoàn tất
        window.addEventListener('load', function scrollAfterLoad() {
          if (!hasScrolled) {
            scrollToProducts();
            hasScrolled = true;
          }
          window.removeEventListener('load', scrollAfterLoad);
        });
        
        // Đồng thời cũng lắng nghe popstate để đảm bảo
        window.addEventListener('popstate', function scrollAfterNav() {
          if (!hasScrolled) {
            // Tăng thời gian chờ sau khi điều hướng
            setTimeout(() => {
              scrollToProducts();
              hasScrolled = true;
            }, 500);
          }
          window.removeEventListener('popstate', scrollAfterNav);
        });
      }
    }
    
    // Thêm xử lý cho contact
    else if (linkName === "contact") {
      // Ngăn chặn hành vi mặc định
      if (event) {
        event.preventDefault();
      }
      
      if (window.location.pathname === "/") {
        // Nếu đã ở trang chủ, cuộn đến section contact
        setTimeout(() => {
          scrollToContact();
        }, 100);
      } else {
        // Nếu không ở trang chủ, điều hướng về trang chủ với hash #contact
        navigate("/#contact");
        
        let hasScrolled = false;
        
        window.addEventListener('load', function scrollAfterLoad() {
          if (!hasScrolled) {
            scrollToContact();
            hasScrolled = true;
          }
          window.removeEventListener('load', scrollAfterLoad);
        });
        
        window.addEventListener('popstate', function scrollAfterNav() {
          if (!hasScrolled) {
            setTimeout(() => {
              scrollToContact();
              hasScrolled = true;
            }, 500);
          }
          window.removeEventListener('popstate', scrollAfterNav);
        });
      }
    }
  };
  
  // Thêm useEffect để xử lý hash khi URL thay đổi 
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#products") {
        // Tăng thời gian chờ khi hash thay đổi
        setTimeout(() => {
          scrollToProducts();
        }, 300);
      } else if (window.location.hash === "#contact") {
        // Thêm xử lý cho hash contact
        setTimeout(() => {
          scrollToContact();
        }, 300);
      }
    };

    // Lắng nghe sự kiện hash change
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);


  return (
    <>
      <Nav scrolled={scrolled}>
        <div className="container">
        <div className="brand" onClick={() => navigate("/")}>
          <img src={foodYummy} alt="Logo" style={{ cursor: "pointer" }} />
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
                  href="/#products" 
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
                  href="/#contact" 
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
               href="/#products" 
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
               href="/#contact" 
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
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  padding: 15px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
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