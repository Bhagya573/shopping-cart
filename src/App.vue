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
          <!-- Show Logout button only if user is logged in -->
          <li class="nav-item" v-if="isLoggedIn">
            <a 
              @click.prevent="logout" 
              class="nav-link" 
              :class="{ disabled: !isLoggedIn }" 
              tabindex="0"
              aria-disabled="!isLoggedIn"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('userId');
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
  },
};
</script>

<style src="./assets/styles.css"></style>

<style scoped>
</style>
