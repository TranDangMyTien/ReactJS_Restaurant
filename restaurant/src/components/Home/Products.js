import React, { useState, useEffect, useRef } from "react"; 
import { 
  Section, 
  ProductsWrapper, 
  NavButton, 
  ActionButton, 
  OuterContainer 
} from "./ProductsStyles"; 
import productsData from "./ProductsData";
import OrderModal from "./OrderModal";

export default function Products() { 
  
  const data = productsData;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);

  // Thời gian chuyển tiếp được giảm xuống còn 0.5s để di chuyển nhanh hơn
  const transitionTime = "0.5s";
  // Thời gian đợi giữa các lần tự động chuyển cũng giảm xuống còn 2s
  const autoplayInterval = 2000;

  // Hàm xác định số lượng sản phẩm hiển thị dựa trên kích thước màn hình
  const determineVisibleProducts = () => {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width >= 1800) return 5; // Thêm case cho màn hình rất lớn
    return 4; // Mặc định 4 sản phẩm trên màn hình lớn
  };

  // Hàm di chuyển tự động
  const autoplay = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleProducts >= data.length ? 0 : prevIndex + 1
    );
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

  // Thiết lập autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(autoplay, autoplayInterval); // Di chuyển mỗi 2 giây
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused, visibleProducts, data.length, autoplayInterval]);

  // Hàm di chuyển sang trái với tốc độ nhanh hơn
  const handlePrevClick = () => {
    if (isTransitioning) return; // Ngăn chặn nhấn nút khi đang chuyển tiếp
    
    setIsTransitioning(true);
    
    // Giảm thời gian trễ xuống 50ms
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? Math.max(0, data.length - visibleProducts) : prevIndex - 1
      );
      
      // Đặt lại trạng thái chuyển tiếp sau 0.5 giây (nhanh hơn)
      setTimeout(() => setIsTransitioning(false), 500);
    }, 50);
  };

  // Hàm di chuyển sang phải với tốc độ nhanh hơn
  const handleNextClick = () => {
    if (isTransitioning) return; // Ngăn chặn nhấn nút khi đang chuyển tiếp
    
    setIsTransitioning(true);
    
    // Giảm thời gian trễ xuống 50ms
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + visibleProducts >= data.length ? 0 : prevIndex + 1
      );
      
      // Đặt lại trạng thái chuyển tiếp sau 0.5 giây (nhanh hơn)
      setTimeout(() => setIsTransitioning(false), 500);
    }, 50);
  };

  // Hàm xử lý mua sản phẩm - Mở modal
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    // Ngăn cuộn trang khi modal đang mở
    document.body.style.overflow = 'hidden';
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    // Cho phép cuộn trang lại khi đã đóng modal
    document.body.style.overflow = 'auto';
  };

  // Hàm xử lý khi hover vào carousel
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Hàm xử lý khi rời chuột khỏi carousel
  const handleMouseLeave = () => {
    setIsPaused(false);
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
      <OuterContainer>
        <div className="products-navigation">
          <NavButton 
            className="prev" 
            onClick={handlePrevClick}
            aria-label="Sản phẩm trước"
            disabled={isTransitioning}
          />
          <div 
            className="products-container" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={carouselRef}
          >
            <ProductsWrapper 
              style={carouselPosition} 
              $transitionTime={transitionTime}
              $visibleProducts={visibleProducts}
            > 
              {data.map((product) => ( 
                <div 
                  key={product.id} 
                  className="product-card"
                > 
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
      </OuterContainer>

      {/* Modal đặt hàng */}
      <OrderModal 
        isOpen={isModalOpen} 
        product={selectedProduct} 
        onClose={handleCloseModal} 
      />
    </Section> 
  ); 
}