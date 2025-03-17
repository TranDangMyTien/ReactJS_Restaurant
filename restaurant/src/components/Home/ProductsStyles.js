import styled from "styled-components"; 
import { TitleStyles } from "./ReusableStyles"; 

export const Section = styled.section` 
  ${TitleStyles}; 
  position: relative;
  padding-bottom: 3rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

export const OuterContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 0;
  margin: 0 auto;
  position: relative;
`;

export const ProductsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  transition: transform ${props => props.$transitionTime || '0.8s'} cubic-bezier(0.33, 1, 0.68, 1);
  overflow-x: visible;
  width: 100%;

  @media screen and (max-width: 1024px) {
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    gap: 0.75rem;
  }

  @media screen and (max-width: 480px) {
    gap: 0.5rem;
    padding: 1rem 0.5rem;
  }

  .product-card { 
    flex: 0 0 auto;
    width: ${props => `calc((100% - (1.5rem * ${(props.$visibleProducts || 4) - 1})) / ${props.$visibleProducts || 4})`};
    position: relative; 
    overflow: hidden; 
    border-radius: 1rem; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
    transition: transform 0.3s ease; 

    @media screen and (max-width: 1024px) {
      width: calc((100% - (1rem * 2)) / 3);
    }

    @media screen and (max-width: 768px) {
      width: calc((100% - (0.75rem * 1)) / 2);
    }

    @media screen and (max-width: 480px) {
      width: 100%;
    }

    &:hover { 
      transform: scale(1.05); 
    } 

    .product-image { 
      position: relative; 
      width: 100%; 
      height: 0; 
      padding-bottom: 100%;
      overflow: hidden; 

      img { 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        object-fit: cover; 
        transition: 0.8s ease-in-out;
        
        &:hover {
          transform: scale(1.2);
        }
      } 

      .product-overlay { 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.7); 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        opacity: 0; 
        transition: opacity 0.3s ease; 

        .product-details { 
          text-align: center; 
          color: white; 
          padding: 1rem; 
          transform: translateY(20px); 
          transition: transform 0.3s ease; 
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          justify-content: center;

          h2 { 
            font-size: 1.5rem; 
            margin-bottom: 0.5rem; 
          } 

          h3 { 
            color: #fc4958; 
            font-size: 1.2rem; 
            margin-bottom: 0.5rem; 
          } 

          p { 
           font-size: 1rem; 
            margin-bottom: 1rem; 
            line-height: 1.4; 
            max-height: 3.8em; /* Giới hạn hiển thị khoảng 2-3 dòng */
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Số dòng muốn hiển thị */
            -webkit-box-orient: vertical;
          } 
        } 

        &:hover .product-details { 
          transform: translateY(0); 
        }
      } 

      &:hover .product-overlay { 
        opacity: 1; 
      } 
    } 
  } 
`;

export const NavButton = styled.button`
  position: absolute;
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
  top: 50%;
  transform: translateY(-50%);
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) ${props => props.disabled ? '' : 'scale(1.1)'};
  }

  &:active {
    transform: translateY(-50%) ${props => props.disabled ? '' : 'scale(0.95)'};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  &.prev {
    left: 25px;
  }

  &.next {
    right: 30px;
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
    
    &::before {
      width: 10px;
      height: 10px;
    }
    
    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
    
    &::before {
      width: 8px;
      height: 8px;
    }
    
    &.prev {
      left: 5px;
    }

    &.next {
      right: 5px;
    }
  }
`;

export const ActionButton = styled.button`
  background-color: ${(props) => props.color || "#fc4958"};
  color: white;
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: auto;

  &:hover {
    background-color: #000;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(252, 73, 88, 0.3);
  }

  @media screen and (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;