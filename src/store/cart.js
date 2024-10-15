const state = {  
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  userId: localStorage.getItem('userId') || null,
};

const getters = {
  cartItems: (state) => state.userId ? state.items.filter(item => item.userId === state.userId) : [],
  cartTotal: (state) => {
    return state.items
      .filter(item => item.userId === state.userId)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  },
};

const actions = {
  addToCart({ commit }, product) {
    const userId = localStorage.getItem('userId');
    commit('ADD_TO_CART', { product, userId });
  },
  removeFromCart({ commit }, productId) {
    const userId = localStorage.getItem('userId');
    commit('REMOVE_FROM_CART', { productId, userId });
  },
  adjustQuantity({ commit }, { productId, increment }) {
    const userId = localStorage.getItem('userId');
    commit(increment ? 'INCREMENT_QUANTITY' : 'DECREMENT_QUANTITY', { productId, userId });
  },
  async fetchCartItems({ commit }) {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const userId = localStorage.getItem('userId');
      commit('SET_USER_ID', userId);
      console.log('Fetched cart items:', cartItems.filter(item => item.userId === userId));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },
  setUserId({ commit }, userId) {
    commit('SET_USER_ID', userId);
  },
};

const mutations = {
  ADD_TO_CART(state, { product, userId }) {
    const existingProduct = state.items.find(item => item.id === product.id && item.userId === userId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1, userId });
    }
    updateLocalStorage(state.items);
  },
  REMOVE_FROM_CART(state, { productId, userId }) {
    state.items = state.items.filter(item => !(item.id === productId && item.userId === userId));
    updateLocalStorage(state.items);
  },
  INCREMENT_QUANTITY(state, { productId, userId }) {
    const existingProduct = state.items.find(item => item.id === productId && item.userId === userId);
    if (existingProduct) existingProduct.quantity++;
    updateLocalStorage(state.items);
  },
  DECREMENT_QUANTITY(state, { productId, userId }) {
    const existingProduct = state.items.find(item => item.id === productId && item.userId === userId);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        state.items = state.items.filter(item => !(item.id === productId && item.userId === userId));
      }
    }
    updateLocalStorage(state.items);
  },
  SET_USER_ID(state, userId) {
    state.userId = userId;
    localStorage.setItem('userId', userId);
  },
};

// Utility function to update local storage
function updateLocalStorage(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
