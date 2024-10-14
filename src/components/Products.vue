<template>
  <div class="product-list">
    <h2>Products</h2>
    <div class="row">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        class="col" 
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
    },
  },
  mounted() {
    this.$store.dispatch('products/fetchProducts');
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px;
  background-color: #f8f9fa;
}

.product-list h2 {
  text-align: center;
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the product items */
}

.col {
  flex: 1 1 calc(25% - 20px); /* Responsive sizing */
  margin: 10px; /* Space between items */
  max-width: 250px; /* Optional: Limit width of each item */
}


</style>
