<template>
  <div class="product-list">
    <h1>Product List</h1>
    <div v-if="loading">Loading products...</div>
    <div v-if="error">{{ error }}</div>
    <div class="row" v-if="products.length > 0">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <ProductItem :product="product" @add-to-cart="addToCart" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import ProductItem from './ProductItem.vue';

export default {
  name: "ProductsComponent",
  components: { ProductItem },
  computed: {
    ...mapGetters('products', ['allProducts', 'isLoading', 'errorMessage']),
    products() { return this.allProducts; },
    loading() { return this.isLoading; },
    error() { return this.errorMessage; },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch('products/fetchProducts');
    },
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product);
    },
  },
};
</script>

<style scoped>
.product-list {
  margin-top: 2rem;
}
</style>
