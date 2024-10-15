// src/services/productService.js

import apiClient from './apiInterceptor';

export const getProducts = async () => {
  return await apiClient.get('products');
};

export const addProduct = async (product) => {
  return await apiClient.post('add-product', product);
};

// Add more API methods as needed

