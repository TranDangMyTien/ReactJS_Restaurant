import React, { useState, useEffect, useRef } from "react";
import { ArrowUpCircle } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  // Kiểm tra vị trí cuộn để hiển thị nút
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollThreshold = documentHeight * 0.3; // Hiển thị khi cuộn 30%
      setIsVisible(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Styles
  const styles = {
    container: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
      pointerEvents: isVisible ? "auto" : "none",
      zIndex: 1000,
    },
    button: {
      width: "48px",
      height: "48px",
      background: "linear-gradient(135deg, #FFD700, #FFA500)",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(255, 165, 0, 0.3)",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    },
    icon: {
      width: "28px",
      height: "28px",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        style={styles.button}
        onMouseEnter={() => {
          buttonRef.current.style.transform = "translateY(-3px)";
          buttonRef.current.style.boxShadow = "0 6px 12px rgba(255, 165, 0, 0.5)";
        }}
        onMouseLeave={() => {
          buttonRef.current.style.transform = "";
          buttonRef.current.style.boxShadow = "";
        }}
      >
        <ArrowUpCircle style={styles.icon} />
      </button>
    </div>
  );
};

export default ScrollToTop;
