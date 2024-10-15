<template>
  <div class="cart">
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <div class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span class="item-count" v-if="totalItemCount > 0">{{ totalItemCount }}</span>
      </div>
    </div>
    <ul class="cart-items">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" alt="Item Image" class="item-image" />
        <div class="item-details">
          <h5>{{ item.title }}</h5>
          <p>{{ item.quantity }} x ${{ formatPrice(item.price) }}</p>
        </div>
        <div class="item-actions">
          <button @click="adjustQuantity(item.id, false)" class="quantity-btn">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="adjustQuantity(item.id, true)" class="quantity-btn">+</button>
          <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>
      </li>
    </ul>
    <h3 class="total">Total: ${{ formatPrice(cartTotal) }}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal']),
    totalItemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  methods: {
    formatPrice(price) {
      return Number(price).toFixed(2);
    },
    removeFromCart(productId) {
      this.$store.dispatch('cart/removeFromCart', productId);
    },
    adjustQuantity(productId, increment) {
      this.$store.dispatch('cart/adjustQuantity', { productId, increment });
    },
  },
  watch: {
    cartItems: {
      immediate: true,
      handler() {
        console.log("Cart items updated:", this.cartItems);
      },
    },
  },
  mounted() {
    this.$store.dispatch('cart/fetchCartItems');
  },
};
</script>
