import { createStore } from 'vuex';
import cart from './cart';
import products from './products';

const store = createStore({
  modules: {
    cart,
    products
  },
});

export default store;
