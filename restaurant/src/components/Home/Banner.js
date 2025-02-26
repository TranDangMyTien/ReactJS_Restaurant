import React, { useState } from "react";
import spoon from "../../assets/spoon.png";
import welcome from "../../assets/welcome.png";

// Hook kiểm tra kích thước màn hình
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const Banner = () => {
  const [hover, setHover] = useState(false);
  const isMobile = useMediaQuery("(max-width: 920px)");

  // 🎨 Style cho màn hình lớn (PC, Tablet lớn)
  const stylesDesktop = {
    header: {
      backgroundColor: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "2rem 5%",
      flexWrap: "wrap",
    },
    wrapperInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      color: "",
      paddingLeft: "2rem",
    },
    headerH1: {
      color: "var(--color-golden)",
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "capitalize",
      lineHeight: "100px",
      fontSize: "55px",
    },
    paragraph: {
      margin: "2rem 0",
      fontSize: "18px",
      lineHeight: "1.6",
    },
    buttonWrapper: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      marginTop: "1.5rem", // Điều chỉnh khoảng cách từ text phía trên
    },
    button: {
      backgroundColor: "#FFD700",
      color: "#000",
      padding: "0.8rem 2.5rem",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      textTransform: "uppercase",
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "1px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)",
      transition: "all 0.3s ease-in-out",
    },
    buttonHover: {
      backgroundColor: "#FFA500",
      color: "#000",
      boxShadow: "0 10px 25px rgba(235, 208, 58, 0.5)",
      transform: "translateY(-3px)",
    },
    wrapperImg: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    img: {
      width: "90%",
      maxWidth: "600px",
    },
  };

  // 📱 Style cho màn hình nhỏ (Mobile, Tablet nhỏ)
  const stylesMobile = {
    header: {
      backgroundColor: "white",
      padding: "2rem 1.5rem",
      minHeight: "auto",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    wrapperInfo: {
      color: "black",
      maxWidth: "600px",
      textAlign: "center",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    headerH1: {
      color: "var(--color-golden)",
      fontWeight: 700,
      letterSpacing: "0.04em",
      fontSize: "40px",
      lineHeight: "1.3",
      marginBottom: "1.5rem",
    },
    paragraph: {
      fontSize: "16px",
      lineHeight: "1.6",
      marginBottom: "2rem",
      opacity: 0.9,
    },
    button: {
      backgroundColor: "#FFD700",
      color: "#000",
      padding: "0.8rem 2.5rem",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      textTransform: "uppercase",
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "1px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)",
      transition: "all 0.3s ease-in-out",
    },
    buttonHover: {
      backgroundColor: "#FFD700",
      color: "#000",
      boxShadow: "0 10px 25px rgba(255, 215, 0, 0.5)",
      transform: "translateY(-3px)",
    },
    wrapperImg: {
      position: "relative",
      width: "100%",
      marginTop: "3rem",
    },
    backgroundSquare: {
      position: "absolute",
      width: "280px",
      height: "280px",
      backgroundColor: "#DCB547",
      opacity: 0.1,
      right: "10%",
      bottom: "5%",
    },
    img: {
      width: "100%",
      maxWidth: "400px",
      height: "auto",
      display: "block",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },
  };

  const styles = isMobile ? stylesMobile : stylesDesktop;

  return (
    <div style={styles.header} id="home">
      <div style={styles.wrapperInfo}>
        <h1 style={styles.headerH1}>The Art of Exquisite Dining</h1>

        <p style={styles.paragraph}>
          Indulge in a symphony of flavors, meticulously crafted from the finest
          ingredients. Experience a dining adventure where every bite tells a
          story of passion, creativity, and perfection.
        </p>

        <div style={styles.buttonWrapper}>
          <button
            type="button"
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            ORDER NOW
          </button>
        </div>
      </div>

      <div style={styles.wrapperImg}>
        {isMobile && <div style={styles.backgroundSquare}></div>}
        <img src={welcome} alt="header_img" style={styles.img} />
      </div>
    </div>
  );
};

export default Banner;
