// Các hàm tiện ích cho Navbar

/**
 * Lấy chiều cao của navbar
 * @returns {number} Chiều cao của navbar (pixel)
 */
export const getNavbarHeight = () => {
    const navElement = document.querySelector('nav');
    return navElement ? navElement.offsetHeight : 80; // 80px là giá trị mặc định
  };
  
  /**
   * Cuộn trang đến phần Products
   * @param {number} attemptCount - Số lần thử (mặc định: 0)
   */
  export const scrollToProducts = (attemptCount = 0) => {
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
  
  /**
   * Cuộn trang đến phần Contact
   * @param {number} attemptCount - Số lần thử (mặc định: 0)
   */
  export const scrollToContact = (attemptCount = 0) => {
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
  