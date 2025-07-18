import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Get all products with filtering
const getProducts = async (params) => {
  // Giả lập dữ liệu mẫu
  const mockProducts = [
    {
      _id: '1',
      name: 'Nike Air Max 270',
      brand: 'Nike',
      category: 'running',
      price: 120,
      images: ['/images/AM270.jpg'],
      discount: 10,
      rating: { average: 4.5, count: 10 },
      sizes: [
        { size: '39', stock: 10 },
        { size: '40', stock: 8 }
      ],
      colors: [
        { name: 'Trắng', code: '#ffffff' },
        { name: 'Đen', code: '#000000' }
      ],
      specs: { Loại: 'Sneaker', Màu: 'Trắng/Đen', Size: '39-44' }
    },
    {
      _id: '2',
      name: 'Adidas Ultraboost',
      brand: 'Adidas',
      category: 'running',
      price: 180,
      images: ['/images/ultraboost.jpg'],
      discount: 0,
      rating: { average: 4.8, count: 200 },
      sizes: [
        { size: '39', stock: 7 },
        { size: '40', stock: 6 },
        { size: '41', stock: 4 }
      ],
      colors: [
        { name: 'Xanh', code: '#22223b' },
        { name: 'Kem', code: '#f2e9e4' }
      ],
      specs: { Loại: 'Running', Màu: 'Xanh/Kem', Size: '39-41' }
    },
    {
      _id: '3',
      name: 'Nike Air Force 1',
      brand: 'Nike',
      category: 'lifestyle',
      price: 120,
      images: ['/images/af1.jpg'],
      discount: 5,
      rating: { average: 4.7, count: 300 },
      sizes: [
        { size: '38', stock: 3 },
        { size: '40', stock: 6 },
        { size: '42', stock: 2 }
      ],
      colors: [
        { name: 'Trắng', code: '#ffffff' },
        { name: 'Xanh đậm', code: '#1d3557' }
      ],
      specs: { Loại: 'Lifestyle', Màu: 'Trắng/Xanh đậm', Size: '38-42' }
    },
    {
      _id: '4',
      name: 'Puma RS-X',
      brand: 'Puma',
      category: 'lifestyle',
      price: 140,
      images: ['/images/PUMARSX.jpg'],
      discount: 0,
      rating: { average: 4.3, count: 90 },
      sizes: [
        { size: '39', stock: 5 },
        { size: '41', stock: 3 }
      ],
      colors: [
        { name: 'Xanh', code: '#457b9d' },
        { name: 'Trắng', code: '#f1faee' }
      ],
      specs: { Loại: 'Lifestyle', Màu: 'Xanh/Trắng', Size: '39-41' }
    }
  ];
  return {
    products: mockProducts,
    totalPages: 1,
    currentPage: 1,
    totalProducts: mockProducts.length
  };
};

// Get single product
const getProduct = async (id) => {
  // Giả lập dữ liệu mẫu cho các id 1,2,3,4
  const mockProducts = {
    '1': {
      _id: '1',
      name: 'Nike Air Max 270',
      description: 'Giày thể thao Nike Air Max 270 chính hãng.',
      brand: 'Nike',
      category: 'running',
      price: 120,
      images: ['/images/AM270.jpg'],
      sizes: [
        { size: '39', stock: 10 },
        { size: '40', stock: 8 }
      ],
      colors: [
        { name: 'Trắng', code: '#ffffff' },
        { name: 'Đen', code: '#000000' }
      ],
      features: ['Êm ái', 'Thời trang'],
      rating: { average: 4.5, count: 10 },
      reviews: [],
      isNewArrival: true,
      isBestSeller: false,
      discount: 10,
      specs: { Loại: 'Sneaker', Màu: 'Trắng/Đen', Size: '39-44' }
    },
    '2': {
      _id: '2',
      name: 'Adidas Ultraboost',
      description: 'Giày Adidas Ultraboost siêu nhẹ.',
      brand: 'Adidas',
      category: 'running',
      price: 180,
      images: ['/images/ultraboost.jpg'],
      sizes: [
        { size: '39', stock: 7 },
        { size: '40', stock: 6 },
        { size: '41', stock: 4 }
      ],
      colors: [
        { name: 'Xanh', code: '#22223b' },
        { name: 'Kem', code: '#f2e9e4' }
      ],
      features: ['Nhẹ', 'Bền'],
      rating: { average: 4.8, count: 200 },
      reviews: [],
      isNewArrival: false,
      isBestSeller: true,
      discount: 0,
      specs: { Loại: 'Running', Màu: 'Xanh/Kem', Size: '39-41' }
    },
    '3': {
      _id: '3',
      name: 'Nike Air Force 1',
      description: 'Nike Air Force 1 cổ điển.',
      brand: 'Nike',
      category: 'lifestyle',
      price: 120,
      images: ['/images/af1.jpg'],
      sizes: [
        { size: '38', stock: 3 },
        { size: '40', stock: 6 },
        { size: '42', stock: 2 }
      ],
      colors: [
        { name: 'Trắng', code: '#ffffff' },
        { name: 'Xanh đậm', code: '#1d3557' }
      ],
      features: ['Phong cách', 'Dễ phối đồ'],
      rating: { average: 4.7, count: 300 },
      reviews: [],
      isNewArrival: false,
      isBestSeller: true,
      discount: 5,
      specs: { Loại: 'Lifestyle', Màu: 'Trắng/Xanh đậm', Size: '38-42' }
    },
    '4': {
      _id: '4',
      name: 'Puma RS-X',
      description: 'Puma RS-X trẻ trung, năng động.',
      brand: 'Puma',
      category: 'lifestyle',
      price: 140,
      images: ['/images/PUMARSX.jpg'],
      sizes: [
        { size: '39', stock: 5 },
        { size: '41', stock: 3 }
      ],
      colors: [
        { name: 'Xanh', code: '#457b9d' },
        { name: 'Trắng', code: '#f1faee' }
      ],
      features: ['Năng động', 'Cá tính'],
      rating: { average: 4.3, count: 90 },
      reviews: [],
      isNewArrival: true,
      isBestSeller: false,
      discount: 0,
      specs: { Loại: 'Lifestyle', Màu: 'Xanh/Trắng', Size: '39-41' }
    }
  };
  if (mockProducts[id]) {
    return mockProducts[id];
  }
  // Nếu không phải id giả lập, gọi API thật (khi backend đã có dữ liệu)
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add review to product
const addReview = async (id, reviewData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/${id}/reviews`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

// Create product (admin only)
const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, productData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Update product (admin only)
const updateProduct = async (id, productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Delete product (admin only)
const deleteProduct = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
  addReview,
  createProduct,
  updateProduct,
  deleteProduct
};

export default productService;