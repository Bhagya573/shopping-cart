<template>
  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>