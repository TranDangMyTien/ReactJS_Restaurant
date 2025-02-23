import React, { useState } from "react";
import styled from "styled-components";
import background from "../../assets/main_banner.webp";

export default function ZoomBanner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Section id="zoombanner">
      <div className="background-wrapper">
        <div
          className="background"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={background} alt="" className={isHovered ? "zoomed" : ""} />
        </div>
      </div>
      <div className="content">
        <h1>Discover the Perfect Premium Pan Free Hand Toast!</h1>
        <h2>
          Experience the ultimate toasting experience with our premium pan –
          perfect for every kitchen!
        </h2>
        <button>Reserve</button>
      </div>
    </Section>
  );
}

const Section = styled.section`
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem; /* Tạo khoảng cách xung quanh */

  .background-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3rem;
    overflow: hidden;
  }

  .background {
    width: 90%; /* Giảm kích thước để tạo khoảng trống xung quanh */
    height: 90%;
    overflow: hidden;
    border-radius: 2rem;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      filter: brightness(60%);
      border-radius: 2rem;
      transition: transform 0.8s ease-in-out;
    }

    img.zoomed {
      transform: scale(1.1);
    }
  }

  .content {
    position: absolute;
    top: 30%;
    left: 10%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: flex-start;

    h1 {
      font-size: 3rem;
      width: 60%;
    }
    h2 {
      width: 60%;
    }
    button {
      background-color: #fff;
      color: #000;
      padding: 0.8rem 2.5rem;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
      font-family: "Poppins", sans-serif;
      letter-spacing: 1px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #ffd700;
        color: #000;
        box-shadow: 0 10px 25px rgba(255, 215, 0, 0.5);
        transform: translateY(-3px);
      }
    }
  }

  @media screen and (min-width: 260px) and (max-width: 1080px) {
    .content {
      top: 25%;
      left: 15%;
      h1 {
        font-size: 1.5rem;
      }
      h2 {
        font-size: 1rem;
      }
      button {
        padding: 0.7rem 1.8rem;
        font-size: 0.8rem;
      }
    }
  }
`;
