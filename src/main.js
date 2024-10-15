import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './routes'; // Import the router
import trimDirective from './directives/trim'; // Import the trim directive

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './assets/styles.css'; // Import global styles
import '@fortawesome/fontawesome-free/css/all.css';
const app = createApp(App);
app.use(store); // Use the Vuex store
app.use(router); // Use Vue Router
app.directive('trim', trimDirective);
app.mount('#app'); // Mount the app to the DOM
