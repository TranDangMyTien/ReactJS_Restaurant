import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TitleStyles } from "./ReusableStyles";

export default function CustomerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mảng chứa các phản hồi của khách hàng
  const testimonials = [
    {
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1715712424/jkpwd5crqq8cvbuslwlq.png", // Thay bằng hình ảnh thực tế
      content: "I found every dish delicious, let me list the dishes I ate: Raw shrimp salad, crispy fried catfish salad, pad thai, fried rice...",
      user: "@tastemebae",
      location: "Quận 11, Hồ Chí Minh",
      rating: 5
    },
    {
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1718945432/zzoxebexjrkkxwlfsxip.jpg", // Thay bằng hình ảnh thực tế
      content: "Spacious, airy space. Delicious food, unique flavor. Enthusiastic, attentive staff.",
      user: "@foodlover",
      location: "Quận 1, Hồ Chí Minh",
      rating: 5
    },
    {
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1718884582/te0yqajz8dp0m1vae0o8.jpg", // Thay bằng hình ảnh thực tế
      content: "Fresh seafood dishes, reasonable prices. Especially the raw shrimp salad, eat once and remember forever. Will come back next time.",
      user: "@seafoodfan",
      location: "Vũng Tàu",
      rating: 4
    }
  ];

  // Tự động chuyển đổi slide sau mỗi 5 giây
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [testimonials.length]);

  // Xử lý khi nhấn nút tiếp theo
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Xử lý khi nhấn nút trước đó
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Hiển thị số sao dựa trên rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <Section id="feedback">
      <div className="title">
        <h1 className="yellow">What Do Customers Say?</h1>
        <p>
          Genuine reviews from customers who have experienced our restaurant
        </p>
      </div>

      <div className="testimonials-container">
        <button className="nav-button prev" onClick={handlePrev}>❮</button>
        
        <div className="testimonial-card">
          <div className="testimonial-content">
            <div className="quote-icon">❝</div>
            <p className="feedback-text">
              {testimonials[currentIndex].content}
            </p>
            <div className="user-info">
              <span className="username">{testimonials[currentIndex].user}</span>
              <span className="location">{testimonials[currentIndex].location}</span>
            </div>
            <div className="rating">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
          </div>
          <div className="testimonial-image">
            <img src={testimonials[currentIndex].image} alt="Customer" />
          </div>
        </div>
        
        <button className="nav-button next" onClick={handleNext}>❯</button>
      </div>

      <div className="dots">
        {testimonials.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 4rem 4rem;
  ${TitleStyles};
  
  .testimonials-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    position: relative;
  }
  
  .testimonial-card {
    display: flex;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;
  }
  
  .testimonial-content {
    flex: 1;
    padding: 2rem;
    position: relative;
  }
  
  .quote-icon {
    font-size: 4rem;
    color: #f9c74f;
    position: absolute;
    top: 10px;
    left: 20px;
    opacity: 0.3;
  }
  
  .feedback-text {
    font-size: 1.2rem;
    line-height: 1.8;
    margin: 1.5rem 0;
    position: relative;
    z-index: 1;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
  
  .username {
    color: #fc4958;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .location {
    color: #666;
    font-size: 0.9rem;
  }
  
  .rating {
    margin-top: 0.5rem;
  }
  
  .star {
    color: #ddd;
    font-size: 1.5rem;
    margin-right: 5px;
  }
  
  .star.filled {
    color: #f9c74f;
  }
  
  .testimonial-image {
    width: 300px;
    height: auto;
    overflow: hidden;
  }
  
  .testimonial-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .nav-button {
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
    }
  
  .nav-button:hover {
    background-color: #f9c74f;
  }
  
  .prev {
    left: -20px;
  }
  
  .next {
    right: -20px;
  }
  
  .dots {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .dot {
    height: 12px;
    width: 12px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
  
  .dot.active {
    background-color: #fc4958;
  }
  
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    margin: 2rem;
    
    .testimonial-card {
      flex-direction: column-reverse;
    }
    
    .testimonial-image {
      width: 100%;
      height: 200px;
    }
    
    .nav-button {
      width: 35px;
      height: 35px;
      font-size: 1.2rem;
    }
    
    .prev {
      left: 10px;
    }
    
    .next {
      right: 10px;
    }
  }
`;