import { getProducts, addProduct } from '../services/productService.js';

const state = {
  items: [],
  loading: false,
  error: null,
};

const getters = {
  allProducts: (state) => state.items,
  isLoading: (state) => state.loading,
  errorMessage: (state) => state.error,
};

const actions = {
  async request(module, fields, action) {
    try {
      const response = await axios.post(`${API_URL}/${module}/${action}`, fields);
      return { success: true, data: response.data };
    } catch (error) {
      // Handle error and return a standardized response
      return { success: false, message: error.response?.data?.message || 'An error occurred' };
    }
  },

  async fetchProducts({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await getProducts('products','fetchData');
      commit('SET_PRODUCTS', response.data);
      localStorage.setItem('products', JSON.stringify(response.data));
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch products.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async addProduct({ commit, state }, product) {
    // const result = await apiService.request('product', fields, 'get');
    console.log(product, "product details",state.items)
    try {
      const response = await addProduct(product, 'products', 'create');
      console.log(response.status, "response status")
      if (response.status === 200) { // Check for successful response
        commit('ADD_PRODUCT', response.data);
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error adding product: ${response.message}`);
    }
  }
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.items = products;
  },
  ADD_PRODUCT(state, product) {
    state.items.push(product);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
