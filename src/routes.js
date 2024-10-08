import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Products from './components/Products.vue';
import ProductDetail from './components/ProductDetail.vue';
import Cart from './components/Cart.vue';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/products', component: Products, name: 'products' },
  { path: '/products/:id', component: ProductDetail, name: 'product-details' },
  { path: '/cart', component: Cart, name: 'cart' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
