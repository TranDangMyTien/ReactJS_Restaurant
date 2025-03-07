import React from 'react';
import styled from 'styled-components';

// Styled components for OrderModal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  
  &:hover {
    color: #333;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
  }
  
  .price {
    font-size: 18px;
    font-weight: bold;
    color: #fc4958;
    margin-bottom: 10px;
  }
  
  .description {
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const OrderDetails = styled.div`
  margin-bottom: 20px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  span {
    margin: 0 15px;
    min-width: 30px;
    text-align: center;
  }
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Note = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  
  .label {
    color: #333;
  }
  
  .amount {
    color: #fc4958;
    font-size: 18px;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #fc4958;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e63946;
  }
`;

const OrderModal = ({ isOpen, product, onClose }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [note, setNote] = React.useState("");
  
  if (!isOpen) return null;
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  
  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name} to the cart with note: ${note}`);
    onClose();
  };
  
  const extractPrice = (priceString) => {
    const cleaned = priceString.replace(/[^\d.,]/g, "");
    const normalized = cleaned.replace(/,/g, ".");
    const parts = normalized.split('.');
    let result;
    
    if (parts.length > 1) {
      const decimal = parts.pop();
      result = parts.join('') + '.' + decimal;
    } else {
      result = normalized;
    }
    
    return parseFloat(result);
  };
  
  const price = extractPrice(product.price);
  const total = price * quantity;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>Place Order</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ProductInfo>
          <ProductImage>
            <img src={product.image} alt={product.name} />
          </ProductImage>
          
          <ProductDetails>
            <h3>{product.name}</h3>
            <div className="price">{product.price}</div>
            <div className="description">{product.description}</div>
          </ProductDetails>
        </ProductInfo>
        
        <OrderDetails>
          <QuantitySelector>
            <QuantityButton onClick={handleDecrement} disabled={quantity <= 1}>-</QuantityButton>
            <span>{quantity}</span>
            <QuantityButton onClick={handleIncrement}>+</QuantityButton>
          </QuantitySelector>
          <Note placeholder="Add a note" value={note} onChange={handleNoteChange} />
        </OrderDetails>
        
        <TotalPrice>
          <span className="label">Total:</span>
          <span className="amount">{formatCurrency(total)}</span>
        </TotalPrice>
        
        <AddToCartButton onClick={handleAddToCart}>ADD TO CART</AddToCartButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OrderModal;
