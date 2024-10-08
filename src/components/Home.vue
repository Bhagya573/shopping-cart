<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <RegistrationForm @product-added="refreshProducts" />
    <router-link to="/products" class="btn btn-primary btn-lg mt-3">View Products</router-link>
  </div>
</template>

<script>
import RegistrationForm from './RegistrationForm.vue';

export default {
  name: 'HomeComponent',
  components: { RegistrationForm },
  methods: {
    refreshProducts() {
      this.$store.dispatch('products/fetchProducts');
    }
  }
};
</script>

<style scoped>
.home {
  margin-top: 5rem;
  padding: 20px;
}
</style>
