import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartBadge } from "./NavbarStyles";

/**
 * Component hiển thị nút giỏ hàng và OrderNow
 * 
 * @param {Object} props - Props của component
 * @param {number} props.totalItems - Tổng số sản phẩm trong giỏ hàng
 * @param {boolean} props.isMobile - Có phải hiển thị cho mobile không
 * @returns {JSX.Element} Component CartButton
 */
const CartButton = ({ totalItems, isMobile = false }) => {
  const containerClass = isMobile ? "cart-and-order-mobile" : "cart-and-order";
  
  return (
    <div className={containerClass}>
      <div className="cart-icon">
        <FaShoppingCart />
        {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
      </div>
      <button className="order-now-btn">ORDER NOW</button>
    </div>
  );
};

export default CartButton;