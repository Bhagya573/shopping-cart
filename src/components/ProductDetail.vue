<template>
  <div class="product-detail">
    <h1>{{ product?.title }}</h1>
    <img :src="product?.image" alt="Product Image" class="product-image" />
    <p>Price: ${{ product?.price }}</p>
    <button v-if="product" @click="addToCart">Add to Cart</button>
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('products', ['allProducts']),
    product() {
      const id = this.$route.params.id;
      return this.allProducts.find(p => p.id === Number(id));
    },
  },
  methods: {
    addToCart() {
      if (this.product) {
        this.$store.dispatch('cart/addToCart', this.product);
        alert(`${this.product.title} added to cart!`);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
