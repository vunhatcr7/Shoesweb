import axios from 'axios';

const API_URL = '/api/orders';

// Create new order
const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

// Get user orders
const getUserOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get order details
const getOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};

const orderService = {
  createOrder,
  getUserOrders,
  getOrderDetails,
};

export default orderService; 