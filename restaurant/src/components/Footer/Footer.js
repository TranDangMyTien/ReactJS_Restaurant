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
      <TopSection>
        {/* Đã xóa wave-container */}

        <FooterContent>
          <BrandSection>
            <LogoContainer>
              <img src={logo} alt="Epsilon Restaurant Logo" />
            </LogoContainer>
            <p>
              Experience great food at Epsilon Restaurant, which offers a perfect blend of traditional 
              and modern cuisine.
            </p>
            <SocialLinks>
              <SocialIcon>
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon>
                <AiFillInstagram />
              </SocialIcon>
              <SocialIcon>
                <BsTwitter />
              </SocialIcon>
              <SocialIcon>
                <GrLinkedinOption />
              </SocialIcon>
            </SocialLinks>
          </BrandSection>

          <AboutSection>
            <FooterHeading>
              <span>About Us</span>
            </FooterHeading>
            <p>
              Bếp Thái Restaurant is located in Vung Tau, offering a luxurious, cozy space with a rich 
              menu from top chefs. We are committed to providing the freshest ingredients and the most 
              professional service.
            </p>
          </AboutSection>

          <ContactSection>
            <FooterHeading>
              <span>Contact Us</span>
            </FooterHeading>
            <ContactItem>
              <IconWrapper>
                <FaPhoneAlt />
              </IconWrapper>
              <p>(+84) 123 456 789</p>
            </ContactItem>
            <ContactItem>
              <IconWrapper>
                <FaEnvelope />
              </IconWrapper>
              <p>epsilon.restaurant@gmail.com</p>
            </ContactItem>
            <ContactItem>
              <IconWrapper>
                <AiFillInstagram />
              </IconWrapper>
              <p>@EpsilonLabs</p>
            </ContactItem>
            <ContactItem>
              <IconWrapper>
                <FaMapMarkerAlt />
              </IconWrapper>
              <p>5 Street 87A, Thạnh Mỹ Lợi Ward, District 2, Ho Chi Minh City, Vietnam</p>
            </ContactItem>
          </ContactSection>
        </FooterContent>
      </TopSection>

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
  background: linear-gradient(135deg, #fc4958, #e68900);
  color: white;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
`;

const TopSection = styled.div`
  position: relative;
  /* Đã xóa mọi CSS liên quan đến wave-container */
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 5rem 5% 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 5rem 8% 2rem;
    text-align: center;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  p {
    margin: 1rem 0;
    line-height: 1.6;
    font-size: 0.95rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

// Đã chỉnh sửa LogoContainer - bỏ các hiệu ứng trang trí
const LogoContainer = styled.div`
  /* Đã xóa background, border-radius, padding, box-shadow */
  margin-bottom: 1rem;
  
  img {
    height: 60px;
    width: auto;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.2rem;
    color: white;
    transition: all 0.3s ease;
  }
  
  &:hover {
    background-color: #f9c74f;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    svg {
      color: #fc4958;
    }
  }
`;

const AboutSection = styled.div`
  p {
    margin-top: 1rem;
    line-height: 1.6;
    font-size: 0.95rem;
    opacity: 0.9;
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterHeading = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  color: #f9c74f;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background-color: #f9c74f;
    border-radius: 10px;
  }
  
  span {
    background: #f9c74f;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 1rem;
    color: #f9c74f;
  }
`;

const BottomSection = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.2rem 0;
  text-align: center;
  
  p {
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.9;
    
    span {
      color: #f9c74f;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;