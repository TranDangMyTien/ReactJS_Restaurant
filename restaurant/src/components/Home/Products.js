import React, { useState, useEffect } from "react"; 
import styled from "styled-components"; 
import { TitleStyles, imageZoomEffect } from "./ReusableStyles"; 

export default function Products() { 
  
  const data = [ 
    { 
      id: 1,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098966/gallery04_cn5jom.png", 
      name: "Chicken Burger", 
      price: "$22.4/pcs", 
      description: "A delicious burger with a juicy grilled chicken patty, topped with fresh lettuce, ripe tomatoes, and our signature creamy sauce.",
    }, 
    { 
      id: 2,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098966/gallery01_vuxtcf.png", 
      name: "Toasted Bread", 
      price: "$5.5/pcs", 
      description: "Perfectly crispy golden-brown toast, lightly buttered and sprinkled with a hint of sea salt.",
    }, 
    { 
      id: 3,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098966/gallery03_qche2f.png", 
      name: "Egg Sandwich", 
      price: "$8/pcs", 
      description: "A soft sandwich loaded with fluffy scrambled eggs, melted cheese, and a dash of black pepper.",
    }, 
    { 
      id: 4,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098967/product4_jpzq18.jpg", 
      name: "Raspberry Cake", 
      price: "$12.5/pcs", 
      description: "A light and fluffy sponge cake layered with fresh raspberry filling and topped with a smooth, velvety cream.",
    }, 
    {
      id: 5,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098967/menu_i68njf.png", 
      name: "Chocolate Muffin", 
      price: "$6.5/pcs", 
      description: "A moist and rich chocolate muffin, packed with gooey chocolate chips and a deep cocoa flavor.",
    },
    { 
      id: 6,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098966/gallery02_ukn18x.png", 
      name: "Spaghetti Carbonara", 
      price: "$15.9/plate", 
      description: "Classic Italian spaghetti tossed in a creamy sauce made with eggs, Parmesan cheese, and crispy bacon.",
    }, 
    { 
      id: 7,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098966/product1_oqwmzu.jpg", 
      name: "Caesar Salad", 
      price: "$10.5/bowl", 
      description: "Fresh romaine lettuce, crunchy croutons, and shaved Parmesan cheese tossed in a creamy Caesar dressing.",
    }, 
    { 
      id: 8,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098967/product2_epv32b.jpg", 
      name: "Grilled Salmon", 
      price: "$18.7/plate", 
      description: "Perfectly grilled salmon fillet seasoned with herbs and lemon, served with a side of roasted vegetables.",
    }, 
    { 
      id: 9,
      image: "https://res.cloudinary.com/dvxzmwuat/image/upload/v1741098967/product3_czuuxz.jpg", 
      name: "Berry Smoothie", 
      price: "$7.5/glass", 
      description: "A refreshing blend of mixed berries, yogurt, and honey, creating a smooth and nutritious drink.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Hàm xác định số lượng sản phẩm hiển thị dựa trên kích thước màn hình
  const determineVisibleProducts = () => {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4; // Mặc định 4 sản phẩm trên màn hình lớn
  };

  useEffect(() => {
    const handleResize = () => {
      const newVisibleProducts = determineVisibleProducts();
      setVisibleProducts(newVisibleProducts);
    };

    // Thiết lập ban đầu
    handleResize();

    // Lắng nghe sự kiện resize
    window.addEventListener('resize', handleResize);

    // Dọn dẹp event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hàm di chuyển sang trái với hiệu ứng chậm
  const handlePrevClick = () => {
    if (isTransitioning) return; // Ngăn chặn nhấn nút khi đang chuyển tiếp
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? Math.max(0, data.length - visibleProducts) : prevIndex - 1
      );
      
      // Đặt lại trạng thái chuyển tiếp sau 1.5 giây
      setTimeout(() => setIsTransitioning(false), 1500);
    }, 200);
  };

  // Hàm di chuyển sang phải với hiệu ứng chậm
  const handleNextClick = () => {
    if (isTransitioning) return; // Ngăn chặn nhấn nút khi đang chuyển tiếp
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + visibleProducts >= data.length ? 0 : prevIndex + 1
      );
      
      // Đặt lại trạng thái chuyển tiếp sau 1.5 giây
      setTimeout(() => setIsTransitioning(false), 1500);
    }, 200);
  };

  // Hàm chuyển sang dot cụ thể
  const goToDot = (index) => {
    if (isTransitioning) return; // Ngăn chặn nhấn dot khi đang chuyển tiếp
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index * visibleProducts);
      
      // Đặt lại trạng thái chuyển tiếp sau 1.5 giây
      setTimeout(() => setIsTransitioning(false), 1500);
    }, 200);
  };

  // Hàm xử lý mua sản phẩm
  const handleBuyNow = (product) => {
    alert(`Bạn đã chọn mua: ${product.name}`);
  };

  // Tính toán vị trí của carousel
  const carouselPosition = {
    transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
  };

  return ( 
    <Section id="products"> 
      <div className="title"> 
        <h1> 
          <span>This week's</span> promotions! 
        </h1> 
        <p>Discover great deals on our products!</p>
      </div>
      <div className="products-navigation">
        <NavButton 
          className="prev" 
          onClick={handlePrevClick}
          aria-label="Sản phẩm trước"
          disabled={isTransitioning}
        />
        <div className="products-container">
          <ProductsWrapper 
            style={carouselPosition} 
            $transitionTime="1.5s"
          > 
            {data.map((product) => ( 
              <div key={product.id} className="product-card"> 
                <div className="product-image"> 
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    onError={(e) => e.target.style.display = 'none'}
                  /> 
                  <div className="product-overlay"> 
                    <div className="product-details"> 
                      <h2>{product.name}</h2> 
                      <h3>{product.price}</h3> 
                      <p>{product.description}</p> 
                      <ActionButton 
                        onClick={() => handleBuyNow(product)}
                        aria-label={`Mua ${product.name}`}
                        color="#fc4958"
                      >
                        Buy Now
                      </ActionButton> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            ))}
          </ProductsWrapper>
        </div>
        <NavButton 
          className="next" 
          onClick={handleNextClick}
          aria-label="Sản phẩm tiếp theo"
          disabled={isTransitioning}
        />
      </div> 
      
      <DotsContainer>
        {[...Array(Math.ceil(data.length / visibleProducts))].map((_, index) => (
          <Dot
            key={index}
            active={index === Math.floor(currentIndex / visibleProducts)}
            onClick={() => goToDot(index)}
            disabled={isTransitioning}
          />
        ))}
      </DotsContainer>
    </Section> 
  ); 
} 
 
const Section = styled.section` 
  ${TitleStyles}; 
  position: relative;
  padding-bottom: 3rem;
  
  .products-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    padding: 1rem 0;
  }

  .products-container {
    width: 90%;
    max-width: 1400px;
    overflow: hidden;
  }
`;

const ProductsWrapper = styled.div`
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
    width: calc((100% - (1.5rem * 3)) / 4);
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
          max-height: 100%; 
          overflow-y: auto; 

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
            max-height: 150px; 
            overflow-y: auto; 
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

const NavButton = styled.button`
  position: relative;
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
  margin: 0 15px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: ${props => props.disabled ? 'none' : 'scale(1.1)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.95)'};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
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
    margin: 0 10px;
    
    &::before {
      width: 10px;
      height: 10px;
    }
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin: 0 5px;
    
    &::before {
      width: 8px;
      height: 8px;
    }
  }
`;

const ActionButton = styled.button`
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

const DotsContainer = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  z-index: 10;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#fc4958" : "rgba(0, 0, 0, 0.3)")};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background-color: ${(props) => (props.active ? "#fc4958" : "rgba(0, 0, 0, 0.5)")};
    transform: ${props => props.disabled ? 'none' : 'scale(1.1)'};
  }
`;