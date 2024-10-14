import { createRouter, createWebHistory } from 'vue-router';
// import Home from './components/Home.vue';
import Products from './components/Products.vue';
import ProductDetail from './components/ProductDetail.vue';
import Cart from './components/Cart.vue';
import Login from './components/LoginForm.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: () => import('./components/Home.vue'), name: 'home' },
  { path: '/products', component: Products, name: 'products' },
  { path: '/products/:id', component: ProductDetail, name: 'product-details' },
  { path: '/cart', component: Cart, name: 'cart' },
  { path: '/login', component: Login, name: 'login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

  // Allow navigation to login page or if logged in
  if (to.name === 'login' || isLoggedIn) {
    next();
  } else {
    next({ name: 'login' }); // Redirect to login if not logged in
  }
});

export default router;
