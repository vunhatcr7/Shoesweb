import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { PhotoIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

// Mock data (nên đồng bộ với ProductListAdmin khi tích hợp backend)
const mockProducts = [
  {
    _id: '1',
    name: 'Nike Air Max 97',
    price: 3500000,
    category: 'Sneaker',
    brand: 'Nike',
    description: 'Classic running shoe',
    images: [
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-97.jpg',
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-97-2.jpg',
    ],
    mainImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-97.jpg',
    status: 'active',
  },
  {
    _id: '2',
    name: 'Nike Air Force 1',
    price: 2800000,
    category: 'Sneaker',
    brand: 'Nike',
    description: 'Iconic street style',
    images: [
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-force-1.jpg',
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-force-1-2.jpg',
    ],
    mainImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-force-1.jpg',
    status: 'inactive',
  },
  // ...
];

const categories = ['Sneaker', 'Running', 'Classic'];
const brands = [
  'Nike', 'Adidas', 'Puma', 'Converse', 'New Balance', 'Vans', 'Reebok', 'Asics', 'Mizuno', 'Li-Ning'
];

const ProductFormAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: categories[0],
    brand: brands[0],
    description: '',
    images: [],
    mainImage: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (id) {
      const product = mockProducts.find((p) => p._id === id);
      if (product) {
        setFormData({
          ...product,
          brand: product.brand || brands[0],
        });
        setImagePreviews(product.images);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setFormData({
      ...formData,
      images: [...formData.images, ...files.map(file => file.name)],
      mainImage: formData.mainImage || files[0].name
    });
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFormData({
      ...formData,
      images: newImages,
      mainImage: formData.mainImage === formData.images[index] ? (newImages[0] || '') : formData.mainImage
    });
  };

  const handleSetMainImage = (index) => {
    setFormData({
      ...formData,
      mainImage: formData.images[index]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ type: 'success', message: id ? 'Product updated!' : 'Product added!' });
      setTimeout(() => {
        setToast(null);
        navigate('/admin/products');
      }, 1200);
    }, 800);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add New Product'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, jpg, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Image Preview Grid */}
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Image Previews</label>
              <div className="grid grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSetMainImage(index)}
                        className={`p-1 rounded-full ${formData.mainImage === formData.images[index]
                          ? 'bg-yellow-500 text-white'
                          : 'bg-white text-gray-800'
                          }`}
                        title="Set as main image"
                      >
                        <StarIcon className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-1 rounded-full bg-red-500 text-white"
                        title="Remove image"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    {formData.mainImage === formData.images[index] && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
                        <StarIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {loading ? (id ? 'Saving...' : 'Adding...') : (id ? 'Save Changes' : 'Add Product')}
          </button>
        </form>
        {toast && (
          <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{toast.message}</div>
        )}
      </div>
    </div>
  );
};

export default ProductFormAdmin; 