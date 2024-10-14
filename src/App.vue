<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">Store</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">Cart</router-link>
          </li>
          <!-- Show Logout only if user is logged in -->
          <li class="nav-item" v-if="isLoggedIn">
            <a @click.prevent="logout" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      // Check if the token exists in localStorage
      return !!localStorage.getItem('token');
    },
    ...mapGetters('cart', ['cartItems']),
    totalItemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  methods: {
    logout() {
      // Remove token from localStorage
      localStorage.removeItem('token');
      // Redirect to the login page
      this.$router.push('/login');
    },
  },
};
</script>

<style src="./assets/styles.css"></style>
