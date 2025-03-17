import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Home/CartContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import foodYummy from "../../assets/Epsilon.png";

// Import các component con
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";

// Import các hàm tiện ích
import { scrollToProducts, scrollToContact } from "./NavbarUtils";

// Import các styled components
import { Nav, ResponsiveNav } from "./NavbarStyles";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart(); // Lấy tổng số sản phẩm từ context

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
            <img src={"https://res.cloudinary.com/dvxzmwuat/image/upload/v1740931265/snapedit_1740931151637_athixb.png"} alt="Logo" style={{ cursor: "pointer" }} />
          </div>
          <div className="nav-right">
            <NavLinks 
              activeLink={activeLink} 
              handleLinkClick={handleLinkClick} 
            />
            <CartButton totalItems={totalItems} />
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
        <NavLinks 
          activeLink={activeLink} 
          handleLinkClick={handleLinkClick} 
          isMobile={true}
        />
        <li className="cart-and-order-mobile">
          <CartButton totalItems={totalItems} isMobile={true} />
        </li>
      </ResponsiveNav>
    </>
  );
}