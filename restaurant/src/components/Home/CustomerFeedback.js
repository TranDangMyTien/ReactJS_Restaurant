import React, { useState } from "react";
import styled from "styled-components";
import { TitleStyles } from "./ReusableStyles";

export default function CustomerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mảng chứa các phản hồi của khách hàng
  const testimonials = [
    {
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1715712424/jkpwd5crqq8cvbuslwlq.png", 
      content: "I found every dish delicious, let me list the dishes I ate: Raw shrimp salad, crispy fried catfish salad, pad thai, fried rice...",
      user: "@tastemebae",
      location: "Quận 11, Hồ Chí Minh",
      rating: 5
    },
    {
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1718945432/zzoxebexjrkkxwlfsxip.jpg", 
      content: "Spacious, airy space. Delicious food, unique flavor. Enthusiastic, attentive staff.",
      user: "@foodlover",
      location: "Quận 1, Hồ Chí Minh",
      rating: 5
    },
    {
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1718884582/te0yqajz8dp0m1vae0o8.jpg", 
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
      <StarSpan key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </StarSpan>
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

      <TestimonialsContainer>
        <NavButton className="prev" onClick={handlePrev} />
        
        <TestimonialCard>
          <TestimonialContent>
            <QuoteIcon>❝</QuoteIcon>
            <FeedbackText>
              {testimonials[currentIndex].content}
            </FeedbackText>
            <UserInfo>
              <Username>{testimonials[currentIndex].user}</Username>
              <Location>{testimonials[currentIndex].location}</Location>
            </UserInfo>
            <RatingContainer>
              {renderStars(testimonials[currentIndex].rating)}
            </RatingContainer>
          </TestimonialContent>
          <TestimonialImage>
            <img 
              src={testimonials[currentIndex].image} 
              alt="Customer" 
              onError={(e) => e.target.style.display = 'none'}
            />
          </TestimonialImage>
        </TestimonialCard>
        
        <NavButton className="next" onClick={handleNext} />
      </TestimonialsContainer>

      <DotsContainer>
        {testimonials.map((_, index) => (
          <Dot 
            key={index} 
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </DotsContainer>
    </Section>
  );
}

// Styled Components
const Section = styled.section`
  margin: 4rem 4rem;
  ${TitleStyles};

  @media screen and (max-width: 768px) {
    margin: 2rem;
  }
`;

const TestimonialsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  position: relative;

  @media screen and (max-width: 768px) {
    margin-top: 2rem;
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

  @media screen and (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
  padding: 2rem;
  position: relative;
`;

const QuoteIcon = styled.div`
  font-size: 4rem;
  color: #f9c74f;
  position: absolute;
  top: 10px;
  left: 20px;
  opacity: 0.3;
`;

const FeedbackText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin: 1.5rem 0;
  position: relative;
  z-index: 1;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Username = styled.span`
  color: #fc4958;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Location = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const RatingContainer = styled.div`
  margin-top: 0.5rem;
`;

const StarSpan = styled.span`
  color: #ddd;
  font-size: 1.5rem;
  margin-right: 5px;

  &.filled {
    color: #f9c74f;
  }
`;

const TestimonialImage = styled.div`
  width: 300px;
  height: auto;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 12px;
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#fc4958" : "rgba(0, 0, 0, 0.3)")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#fc4958" : "rgba(0, 0, 0, 0.5)")};
    transform: scale(1.1);
  }
`;