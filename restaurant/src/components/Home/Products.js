import React, { useState, useEffect } from "react"; 
import { 
  Section, 
  ProductsWrapper, 
  NavButton, 
  ActionButton, 
  DotsContainer, 
  Dot 
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

      {/* Modal đặt hàng */}
      <OrderModal 
        isOpen={isModalOpen} 
        product={selectedProduct} 
        onClose={handleCloseModal} 
      />
    </Section> 
  ); 
}