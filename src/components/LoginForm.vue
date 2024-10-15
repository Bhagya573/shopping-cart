<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="login">
      <div class="login-div">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="login-input"
            required
            v-trim
          />
          <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="login-input"
            required
            v-trim
          />
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Login</button>
        <ErrorMessage v-if="genericError" :message="genericError" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ErrorMessage from './ErrorMessage.vue';
import { useStore } from 'vuex';
import apiClient from '../services/apiInterceptor';

export default {
  components: { ErrorMessage },
  setup() {
    const username = ref('');
    const password = ref('');
    const genericError = ref(null);
    const usernameError = ref(null);
    const passwordError = ref(null);
    const router = useRouter();
    const store = useStore();

    const validateUsername = () => {
      const regex = /^[a-zA-Z0-9_]{3,20}$/;
      usernameError.value = regex.test(username.value) ? null : '3-20 alphanumeric characters or underscores';
    };

    const validatePassword = () => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/;
      passwordError.value = regex.test(password.value) ? null : 'Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, and one number';
    };

    const isFormValid = computed(() => {
      validateUsername();
      validatePassword();
      return username.value && password.value && !usernameError.value && !passwordError.value;
    });

    const login = async () => {
      if (!isFormValid.value) return;

      try {
        const { data } = await apiClient.post('login', { username: username.value, password: password.value });
        
        if (data?.userId) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('username', data.username);
          store.dispatch('cart/setUserId', data.userId);
          router.push('/home');
        } else {
          genericError.value = 'Login failed: User ID not received.';
        }
      } catch (error) {
        genericError.value = error.response?.data?.error_message || 'Login failed!';
      }
    };

    return { 
      username, 
      password, 
      login, 
      isFormValid, 
      genericError, 
      usernameError, 
      passwordError 
    };
  },
};
</script>
