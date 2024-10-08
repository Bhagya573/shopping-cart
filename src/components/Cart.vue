<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} - {{ item.quantity }} x ${{ item.price }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <h3>Total: ${{ cartTotal }}</h3>
  </div>
</template>

<script>
export default {
  name:"CartComponent",
  computed: {
    cartItems() {
      return this.$store.getters['cart/cartItems'];
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal'];
    },
  },
  methods: {
    removeFromCart(itemId) {
      this.$store.dispatch('cart/removeFromCart', itemId);
    },
  },
};
</script>

<style scoped>
.cart {
  margin-top: 2rem;
}
</style>
