<template>
  <div class="product-list">
    <h2>Products</h2>
    <div class="row">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        class="product-width" 
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  computed: {
    ...mapGetters('products', ['allProducts']),
    products() {
      return this.allProducts;
    },
  },
  methods: {
    addToCart(product) {
     this.$store.dispatch('cart/addToCart', product);     
    }
  },
  mounted() {
    this.$store.dispatch('products/fetchProducts');
  },
};
</script>

<style scoped>
</style>
