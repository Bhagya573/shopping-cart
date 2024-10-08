import { getProducts } from '../services/productService.js';

const state = {
    items: JSON.parse(localStorage.getItem('products')) || [],
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
        if (state.items.length > 0) {
            console.log('Using cached products');
            return;
        }

        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        try {
            const response = await getProducts();
            commit('SET_PRODUCTS', response.data);
            console.log("products",response.data)
            localStorage.setItem('products', JSON.stringify(response.data));
        } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch products.');
        } finally {
            commit('SET_LOADING', false);
        }
    },
addProduct({ commit, state }, product) {
    // Check for duplicates before adding
    const exists = state.items.some(existingProduct => existingProduct.id === product.id);
    if (exists) {
      alert('Product with this ID already exists. Please choose a different ID.');
      return;
    }
  
    commit('ADD_PRODUCT', product);
    console.log(...state.items,"product",product)
     // Update local storage with the updated state
     localStorage.setItem('products', JSON.stringify(state.items));
  }
  
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.items = products;
    },
    ADD_PRODUCT(state, product) {
        state.items.push(product);
        console.log(state.items,"state.items")
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
