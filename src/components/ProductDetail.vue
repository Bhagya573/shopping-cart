<template>
  <div class="product-container">
    <h1>{{ product?.title }}</h1>
    <img :src="product?.image" alt="Product Image" class="product-img" />
    <p class="price">Price: ${{ product?.price }}</p>
    <div class="button-group">
      <button v-if="product" @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
      <button @click="goBack" class="back-btn">Back</button>
    </div>
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
        this.$router.push('/cart'); // Navigate to the cart after adding
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

