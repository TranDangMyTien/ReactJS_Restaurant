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

  // Định nghĩa CSS dưới dạng object
  const styles = {
    container: {
      position: "fixed",
      bottom: "32px",
      right: "32px",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.3s ease-in-out",
      pointerEvents: isVisible ? "auto" : "none",
    },
    button: {
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "50%",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    },
    buttonHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
    icon: {
      width: "40px",
      height: "40px",
      color: "#666",
      transition: "color 0.2s ease-in-out",
    },
    iconHover: {
      color: "#333",
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
        <ArrowUpCircle
          style={styles.icon}
          onMouseEnter={(e) => (e.target.style.color = styles.iconHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.icon.color)}
        />
      </button>
    </div>
  );
};

export default ScrollToTop;
