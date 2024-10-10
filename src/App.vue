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
            <router-link to="/cart" class="nav-link">
              Cart
              <span class="badge" v-if="totalItemCount > 0">{{ totalItemCount }}</span>
            </router-link>
          </li>
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
      return !!localStorage.getItem('token'); // Check if token exists
    },
    ...mapGetters('cart', ['cartItems']), // Map cart items from Vuex store
    totalItemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // Remove token on logout
      this.$router.push('/login'); // Redirect to login page
    }
  },
};
</script>

<style src="./assets/styles.css"></style>

<style scoped>
.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  margin-left: 5px;
  font-size: 14px;
}
</style>
