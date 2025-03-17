import React from "react";
import styled from "styled-components";
import logo from "../../assets/Epsilon.png";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";

export default function Footer() {
  return (
    <FooterContainer>
      <InstagramSection>
        <p>Restaurant Bếp Thái</p>
      </InstagramSection>

      <LinksSection>
        <FooterLinks>
          <FooterLink>Our Restaurants</FooterLink>
          <FooterLink>Promotion</FooterLink>
          <FooterLink>Menu</FooterLink>
          <FooterLink>Reservation</FooterLink>
          <FooterLink>Contact</FooterLink>
        </FooterLinks>
        <SocialIconsSmall>
          <SocialIconSmall>
            <FaFacebookF />
          </SocialIconSmall>
          <SocialIconSmall>
            <BsTwitter />
          </SocialIconSmall>
          <SocialIconSmall>
            <AiFillInstagram />
          </SocialIconSmall>
        </SocialIconsSmall>
      </LinksSection>

      <BottomSection>
        <p>
          Copyright &copy; 2025 <span>Epsilon Labs</span>
        </p>
      </BottomSection>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
`;

// Phần mới thêm vào theo thiết kế từ ảnh
const InstagramSection = styled.div`
  background-color: #791823;
  color: white;
  text-align: center;
  padding: 1rem 0;
  
  p {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }
`;

const LinksSection = styled.div`
  background-color: #791823;
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterLink = styled.a`
  color: white;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIconsSmall = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIconSmall = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    font-size: 1rem;
    color: white;
  }
  
  &:hover {
    background-color: white;
    
    svg {
      color: #f05a28;
    }
  }
`;

const BottomSection = styled.div`
  background-color:  #791823;
  padding: 0.6rem 0;
  text-align: center;
  
  p {
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.9;
    color: #fff;
    
    span {
      color: #fff;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;