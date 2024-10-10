<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} - {{ item.quantity }} x ${{ item.price }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <h3>Total: ${{ cartTotal?.toFixed(2) }}</h3>
    <div class="cart-icon">
      <i class="fas fa-shopping-cart"></i>
      <span class="item-count" v-if="totalItemCount > 0">{{ totalItemCount }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "CartComponent",
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal']),
    totalItemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch('cart/removeFromCart', productId);
    }
  },
};
</script>