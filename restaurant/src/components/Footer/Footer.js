import React from "react";
import styled from "styled-components";
import logo from "../../assets/Epsilon.png";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
export default function Footer() {
  return (
    <div className="footer">
      <Section>
        <div className="brand container">
          <img src={logo} alt="" />
          <p>
          Experience great food at Epsilon Restaurant, which offers a perfect blend of traditional and modern cuisine.
          </p>
          <ul>
            <li>
              <AiFillInstagram />
            </li>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <GrLinkedinOption />
            </li>
            <li>
              <BsTwitter />
            </li>
          </ul>
        </div>
        <div className="about container">
          <div className="title">
            <h3>About Us</h3>
          </div>
          <p>
          Epsilon Restaurant is located in Vung Tau, offering a luxurious, cozy space with a rich menu from top chefs. We are committed to providing the freshest ingredients and the most professional service.
          </p>
        </div>
        <div className="contact container">
          <div className="title">
            <h3>Contact Us</h3>
          </div>
          <p>+84 999999999</p>
          <p>epsilon.restaurant@gmail.com</p>
          <p>@EpsilonLabs</p>
          <p>5 Street 87A, Thạnh Mỹ Lợi Ward, District 2, Ho Chi Minh City, Vietnam</p>
        </div>
      </Section>
      <LowerFooter className="lower__footer">
        <h2>
          Copyright &copy; 2025 <span>Epsilon labs</span>
        </h2>
      </LowerFooter>
    </div>
  );
}

const Section = styled.footer`
  margin: 0;
  background: linear-gradient(to right, #fc4958, #e85d04);
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10vw;
  padding: 4vw;

  .brand.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .brand.container img {
    width: 150px; /* Đặt kích thước cố định */
    height: auto; /* Đảm bảo tỷ lệ không bị méo */
    max-width: 100%; /* Giữ nguyên kích thước khi thu nhỏ */
    object-fit: contain; /* Tránh méo ảnh */
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 2rem;
    letter-spacing: 0.1rem;
  }

  ul {
    display: flex;
    list-style-type: none;
    gap: 4vw;
    margin-top: 2vw;

    li {
      padding: 0.8rem;
      border-radius: 2rem;
      background-color: white;
      transition: 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: black;

        svg {
          transform: scale(1.2);
        }
      }

      svg {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fc4958;
        font-size: 1.6rem;
        transition: 0.3s ease-in-out;
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      font-size: 2rem;
    }
  }

  /* Responsive */
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
    text-align: center;

    .brand.container img {
      width: 150px; /* Giữ nguyên kích thước logo */
    }
  }
`;


const LowerFooter = styled.div`
  margin: 0;
  text-align: center;
  background-color: black;
  color: white;
  padding: 1rem;
  h2 {
    span {
      color: #fc4958;
      text-transform: uppercase;
    }
  }
  @media screen and (min-width: 260px) and (max-width: 450px) {
    h2 {
      span {
        display: block;
      }
    }
  }
`;
