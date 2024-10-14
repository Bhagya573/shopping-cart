<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="login" class="login-form">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        required
        class="login-input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="login-input"
      />
      <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Login</button>
      <div>
      <ErrorMessage v-if="genericError" :message="genericError" />
      </div>
    </form>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';

export default {
  components: { ErrorMessage },
  setup() {
    const username = ref('');
    const password = ref('');
    const genericError = ref(null);
    const router = useRouter();

    const isFormValid = computed(() => username.value && password.value);

    const login = async () => {
      try {
        const { data } = await axios.post('http://localhost:3001/login', {
          username: username.value.trim(),
          password: password.value.trim(),
          secretKey: process.env.VUE_APP_SECRET_KEY || 'generated-secret-key',
        });
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/home');
        } else {
          genericError.value = 'Login failed: Token not received.';
        }
      } catch (error) {
        genericError.value = error.response?.data?.message || 'Login failed!';
      }
    };

    return { username, password, login, isFormValid, genericError };
  },
};
</script>