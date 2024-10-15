<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Increment</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Counter',
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
