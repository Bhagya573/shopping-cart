import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/Products.vue';
import ProductDetail from './components/ProductDetail.vue';
import Login from './components/LoginForm.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: () => import('./components/Home.vue'), name: 'home' },
  { path: '/products', component: Products, name: 'products' },
  { path: '/products/:id', component: ProductDetail, name: 'product-details' },
  { path: '/cart',component: () => import('./components/Cart.vue'), name: 'cart' },
  { path: '/login', component: Login, name: 'login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const userId = localStorage.getItem('userId'); // Check if userId exists

  console.log(`Navigating to: ${to.name}, User ID: ${userId}`);

  // Allow navigation if the user is logged in or trying to access the login page
  if (to.name === 'login' || userId) {
    next();
  } else {
    next({ name: 'login' }); // Redirect to login if not logged in
  }
});

export default router;
