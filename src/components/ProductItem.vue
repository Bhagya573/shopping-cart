<template>
  <div class="product-item card">
    <router-link :to="`/products/${product.id}`">
      <img :src="product.image || 'https://via.placeholder.com/150'" class="card-img-top" alt="Product Image" />
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">Price: <strong>${{ product.price }}</strong></p>
      <button class="btn btn-primary" @click.stop="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { product: { type: Object, required: true } },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
      alert(`${this.product.title} added to cart!`);
    },
  },
};
</script>