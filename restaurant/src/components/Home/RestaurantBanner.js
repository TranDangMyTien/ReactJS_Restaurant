import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const bannerImages = [
  "https://res.cloudinary.com/dvxzmwuat/image/upload/v1740925538/main_banner_vxgbfh.webp",
  "https://res.cloudinary.com/dvxzmwuat/image/upload/v1740930566/Restaurant_part1_py2yja.png",
];

export default function RestaurantBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <BannerSection>
      <BannerContainer>
        {bannerImages.map((image, index) => (
          <BannerSlide key={index} active={index === currentIndex}>
            <img src={image} alt={`Slide ${index + 1}`} onError={(e) => e.target.style.display = 'none'} />
          </BannerSlide>
        ))}

        <BannerContent>
          <h1>Bếp Thái</h1>
          <h2>Experience the true taste of Thailand, right in the heart of the city</h2>
          <ButtonGroup>
            <ActionButton color="#fc4958">Book a Table</ActionButton>
            <ActionButton color="#f9c74f">Order Now</ActionButton>
            <ActionButton color="#ff9800">Exclusive Deals</ActionButton>
          </ButtonGroup>
        </BannerContent>

        <NavButton className="prev" onClick={prevSlide} />
        <NavButton className="next" onClick={nextSlide} />

        <DotsContainer>
          {bannerImages.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </DotsContainer>
      </BannerContainer>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  position: relative;
  height: auto;
  width: 100%;
  overflow: hidden;
`;

const BannerContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const BannerSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: ${(props) => (props.active ? "scale(1.05)" : "scale(1)")};
  transition: opacity 1s ease, transform 0.8s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;
  width: 80%;

  h1 {
    font-size: 4.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-family: "Poppins", sans-serif;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
    font-family: "Poppins", sans-serif;
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: ${(props) => props.color || "#fc4958"};
  color: white;
  padding: 1rem 1.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #000;
    transform: translateY(-3px);
  }

  @media screen and (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    display: block;
  }

  &.prev::before {
    transform: rotate(-135deg);
  }

  &.next::before {
    transform: rotate(45deg);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#fc4958" : "rgba(255, 255, 255, 0.5)")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#fc4958" : "rgba(255, 255, 255, 0.8)")};
    transform: scale(1.1);
  }
`;
