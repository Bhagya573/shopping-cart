import { getProducts,addProduct } from '../services/productService.js';

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
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await getProducts();
      commit('SET_PRODUCTS', response.data);
      localStorage.setItem('products', JSON.stringify(response.data));
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch products.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async addProduct({ commit, state }, product) {
    const exists = state.items.some(existingProduct => existingProduct.title === product.title);
    if (exists) {
      alert('Product with this name already exists. Please choose a different name.');
      return;
    }

    try {
      const response = await addProduct(product);
      commit('ADD_PRODUCT', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
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
