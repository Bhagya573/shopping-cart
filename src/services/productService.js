import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => {
  return apiClient.get('/products');
};

export const addProduct = async (product) => {
  try {
    const response = await apiClient.post('/products', product);
    return response.data; // Return the newly added product
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error adding product');
  }
};

