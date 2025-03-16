import React from "react";

/**
 * Component hiển thị danh sách các liên kết trong navbar
 * 
 * @param {Object} props - Props của component
 * @param {string} props.activeLink - Liên kết đang active
 * @param {Function} props.handleLinkClick - Hàm xử lý khi click vào liên kết
 * @param {boolean} props.isMobile - Có phải hiển thị cho mobile không
 * @returns {JSX.Element} Component NavLinks
 */
const NavLinks = ({ activeLink, handleLinkClick, isMobile = false }) => {
  return (
    <ul className={isMobile ? "" : "links"}>
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
          onClick={(e) => handleLinkClick("promotion", e)}
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
          onClick={(e) => handleLinkClick("contact", e)}
        >
          CONTACT
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
