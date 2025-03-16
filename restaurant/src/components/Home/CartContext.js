import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Tạo Context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  totalItems: 0
};

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer để xử lý các action
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity, note } = action.payload;
      
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Sản phẩm đã tồn tại, cập nhật số lượng và ghi chú
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          note: note || updatedItems[existingItemIndex].note
        };
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity
        };
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        return {
          ...state,
          items: [...state.items, { ...product, quantity, note }],
          totalItems: state.totalItems + quantity
        };
      }
    }
    
    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      const removedItem = state.items.find(item => item.id === productId);
      
      if (!removedItem) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== productId),
        totalItems: state.totalItems - removedItem.quantity
      };
    }
    
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === productId);
      
      if (itemIndex < 0) return state;
      
      const oldQuantity = state.items[itemIndex].quantity;
      const quantityDiff = quantity - oldQuantity;
      
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity
      };
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff
      };
    }
    
    case CLEAR_CART:
      return {
        ...initialState
      };
      
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Lấy dữ liệu giỏ hàng từ localStorage khi component được mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Tính lại totalItems từ items đã lưu
        const totalCount = parsedCart.items.reduce((sum, item) => sum + item.quantity, 0);
        dispatch({ 
          type: 'INITIALIZE_CART', 
          payload: { 
            items: parsedCart.items,
            totalItems: totalCount
          }
        });
      } catch (error) {
        console.error('Lỗi khi parse dữ liệu giỏ hàng:', error);
      }
    }
  }, []);
  
  // Lưu giỏ hàng vào localStorage mỗi khi state thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Các hàm helper để dispatch actions
  const addToCart = (product, quantity, note) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { product, quantity, note }
    });
  };
  
  const removeFromCart = (productId) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { productId }
    });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { productId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems: state.totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};