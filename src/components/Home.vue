<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <AddProduct @product-added="refreshProducts" />
    <router-link to="/products" class="btn btn-primary btn-lg mt-3">View Products</router-link>
  </div>
</template>

<script>
import AddProduct from './AddProduct.vue';

export default {
  components: { AddProduct },
  methods: {
    refreshProducts() {
      this.$store.dispatch('products/fetchProducts');
    },
  },
};
</script>
