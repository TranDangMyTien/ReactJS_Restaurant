import React, { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí scroll và hiển thị nút khi cuộn 50% trang
  const checkScrollPosition = () => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollThreshold = documentHeight * 0.5; // Hiển thị khi đã cuộn 50%
    setIsVisible(scrollPosition > scrollThreshold);
  };

  // Xử lý scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // Styles
  const styles = {
    container: {
      position: "fixed",
      bottom: "32px",
      right: "32px",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
      pointerEvents: isVisible ? "auto" : "none",
    },
    button: {
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #FFD700, #FFA500)",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 15px rgba(255, 165, 0, 0.3)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    },
    buttonHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 20px rgba(255, 165, 0, 0.5)",
    },
    icon: {
      width: "32px",
      height: "32px",
      color: "#fff",
      transition: "color 0.3s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={scrollToTop}
        style={styles.button}
        onMouseEnter={(e) => {
          e.target.style.transform = styles.buttonHover.transform;
          e.target.style.boxShadow = styles.buttonHover.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "";
          e.target.style.boxShadow = "";
        }}
      >
        <ArrowUpCircle style={styles.icon} />
      </button>
    </div>
  );
};

export default ScrollToTop;
