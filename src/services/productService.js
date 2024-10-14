import apiClient from './apiInterceptor';

export const getProducts = () => {
  return apiClient.get('/products');
};

// export const addProduct = async (product) => {
//   try {
//     const response = await apiClient.post('/products', product);
//     return response.data; // Return the newly added product
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Error adding product');
//   }
// };

// export const deleteProduct = async (productId) => {
//   try {
//     await apiClient.delete(`/products/${productId}`);
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Error deleting product');
//   }
// };
