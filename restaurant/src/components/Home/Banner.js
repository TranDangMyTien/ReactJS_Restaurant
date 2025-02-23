import React from 'react';
import spoon from "../../assets/spoon.png";
import welcome from "../../assets/welcome.png";

const styles = {
  header: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem 5%", // Đẩy nội dung vào trong một chút
    flexWrap: "wrap",
 
  },
  wrapperInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    color: "white",
    paddingLeft: "2rem", // Đẩy nội dung bên trái vào trong một chút
  },
  subtitle: {
    fontFamily: "var(--font-cormorant)",
    fontSize: "20px",
  },
  spoonImg: {
    width: "auto", // Giữ nguyên kích thước gốc
    height: "auto", // Đảm bảo tỷ lệ ảnh không bị bóp méo
    maxWidth: "100%", // Đảm bảo ảnh không bị to quá so với layout
},
  headerH1: {
    // fontFamily: "var(--font-base)",
    color: "var(--color-golden)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "capitalize",
    lineHeight: "117px",
    fontSize: "65px",
  },
  paragraph: {
    margin: "2rem 0",
    fontSize: "18px",
    lineHeight: "1.6",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center", // Căn giữa button
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    color: "black", // Chữ màu trắng nổi bật hơn
    padding: "0.8rem 2.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600", // Giảm xuống 600 để chữ mềm mại hơn
    textTransform: "uppercase",
    fontFamily: "'Poppins', sans-serif", // Font thân thiện hơn
    letterSpacing: "1px",
    borderRadius: "8px", // Bo góc nhẹ cho cảm giác dễ chịu hơn
    boxShadow: "0 8px 15px rgba(255, 215, 0, 0.3)", // Thêm shadow vàng nhẹ
    transition: "all 0.3s ease-in-out",

    // Hover effect
    ":hover": {
        backgroundColor: "#FFD700", // Màu vàng sáng hơn khi hover
        boxShadow: "0 12px 20px rgba(255, 215, 0, 0.5)", // Đổ bóng mạnh hơn một chút
        transform: "translateY(-2px)", // Nhẹ nhàng nâng button lên khi hover
         },
    },

  buttonHover: {
    backgroundColor: "#e6b800", // Màu vàng đậm hơn khi hover
    boxShadow: "0 12px 20px rgba(255, 215, 0, 0.4)", // Đẩy shadow mạnh hơn khi hover
    transform: "translateY(-2px)", // Nhấn mạnh hiệu ứng khi hover
  },
  wrapperImg: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: "90%", // Làm ảnh to hơn
    maxWidth: "600px", // Giới hạn kích thước tối đa
  },
};

const Banner = () => {
  const [hover, setHover] = React.useState(false);

  return (
    <div style={styles.header} id="home">
      <div style={styles.wrapperInfo}>
        <div style={{ marginBottom: "1rem" }}>
          <p style={styles.subtitle}>Chase the new flavour</p>
          <img src={spoon} alt="spoon_image" style={styles.spoonImg} />
        </div>
        <h1 style={styles.headerH1}>The Key To Fine Dining</h1>
        <p style={styles.paragraph}>
          Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat morbi facilisis quam scelerisque sapien. Et, penatibus aliquam amet tellus.
        </p>
        <div style={styles.buttonWrapper}>
          <button
            type="button"
            style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            ORDER NOW
          </button>
        </div>
      </div>

      <div style={styles.wrapperImg}>
        <img src={welcome} alt="header_img" style={styles.img} />
      </div>
    </div>
  );
};

export default Banner;
