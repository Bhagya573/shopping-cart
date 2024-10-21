// src/services/productService.js

import apiClient from './apiInterceptor';


export const getProducts = async (module,action) => {
  try {
    const response = await apiClient.post(`http://localhost:3001/${module}/${action}`);
    return response;
} catch (error) {
    console.error(error);
    throw error;
}
};

export const addProduct = async (product,module,action) => {
    try {
      const data = `http://localhost:3001/${module}/${action}`
      const response = await apiClient.post(data,product)
      return { status:response.status,success: true, data: response.data };
    } catch (error) {
      // Handle error and return a standardized response
      return { status: error.status, message: error.response?.data?.message};
    }
};

