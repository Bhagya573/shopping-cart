const state = { items: [] };

const getters = {
  cartItems: (state) => state.items,
  cartTotal: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
};

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product);
  },
  removeFromCart({ commit }, productId) {
    commit('REMOVE_FROM_CART', productId);
  },
};

const mutations = {
  ADD_TO_CART(state, product) {
    const itemInCart = state.items.find(item => item.id === product.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1 });
    }
  },
  REMOVE_FROM_CART(state, productId) {
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
    }
  },
};

export default { namespaced: true, state, getters, actions, mutations };
