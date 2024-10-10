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
      <button type="submit" class="login-button">Login</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      secretKey: process.env.VUE_APP_SECRET_KEY || 'generated-secret-key',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3001/login', {
          username: this.username,
          password: this.password,
          secretKey: this.secretKey,
        });
        console.log(response,"response")
            if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert(response.data.message);
          // Navigate to home screen after successful login
          this.$router.push('/home');
         } else {
          this.error = 'Login failed: Token not received.';
        }
      } catch (error) {
        console.log(error,"error")
        this.error = error.response?.data?.message || 'Login failed!';
      }
    },
  },
};
</script>