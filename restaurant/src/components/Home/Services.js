import React from "react";
import styled from "styled-components";
import Services1 from "../../assets/Services1.png";
import Services2 from "../../assets/Services2.png";
import Services3 from "../../assets/Services3.png";
import { TitleStyles } from "./ReusableStyles";
export default function Services() {
  return (
    <Section id="services">
      <div className="title">
        <h1 className="yellow">What Do We Offer?</h1>
        <p>
        Experience unique cuisine in Vung Tau with delicious dishes, luxurious space and dedicated service.
        </p>
      </div>
      <div className="services">
        <div className="service">
          <img src={Services2} alt="" />
          <p>
            We select the <span>freshest ingredients</span> from the sea and land 
            to craft dishes full of rich flavors.
          </p>
          <button>Discover More</button>
        </div>
        <div className="service yellow">
          <img src={Services1} alt="" />
          <p>
            A <span>warm and modern space</span>, perfect for family gatherings, 
            business meetings, or special occasions.
          </p>
          <button>Discover More</button>
        </div>
        <div className="service">
          <img src={Services3} alt="" />
          <p>
            Our professional staff provides <span>attentive service</span>, ensuring you 
            have the best dining experience.
          </p>
          <button>Discover More</button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 2rem 4rem;
  ${TitleStyles};
  .services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10vw;
    margin-top: 4rem;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vw;
      padding: 0 3vw;
      img {
        height: 2.8rem;
      }
      p {
        text-align: center;
        line-height: 2rem;
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
      }
      button {
        padding: 0.6rem 3rem;
        letter-spacing: 0.2rem;
        border-radius: 2rem;
        font-size: 1.1rem;
        border: none;
        color: white;
        background-color: #fc4958;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #f9c74f;
        }
      }
    }
    .yellow {
      button {
        background-color: #f9c74f;
        &:hover {
          background-color: #fc4958;
        }
      }
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    margin: 2rem;
    .services {
      grid-template-columns: 1fr;
    }
  }
`;
