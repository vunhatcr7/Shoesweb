import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Add item to cart
const addToCart = async (productId, size, quantity) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/users/cart`,
    { productId, size, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

// Update cart item quantity
const updateCartItem = async (productId, quantity) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/users/cart/${productId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

// Remove item from cart
const removeFromCart = async (productId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/users/cart/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Clear cart
const clearCart = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/users/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const cartService = {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};

export default cartService; 