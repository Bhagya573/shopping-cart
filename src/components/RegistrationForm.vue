<template>
  <div class="product-form">
    <h1>Create Product</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group" v-for="field in fields" :key="field.name">
        <label :for="field.name">{{ field.label }}</label>
        <Field
          v-model="product[field.name]"
          :id="field.name"
          :type="field.type"
          :name="field.name"
          :rules="field.rules"
          as="input"
        />
        <ErrorMessage :name="field.name" class="error-message" />
      </div>
      <button 
        type="submit" 
        :class="{ active: isActive, disabled: hasError }" 
        :disabled="hasError || !isActive"
      >
        Submit
      </button>
    </form>

    <div v-if="submitted" class="product-details">
      <h2>Product Details</h2>
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Name:</strong> {{ product.name }}</p>
      <p><strong>Price:</strong> ${{ product.price }}</p>
      <img :src="product.image" alt="Product Image" class="product-image" />
    </div>
  </div>
</template>

<script>
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { mapActions } from 'vuex';

export default {
  components: { Field, ErrorMessage },
  data() {
    return {
      product: { id: null, name: '', price: null, image: '' },
      submitted: false,
      fields: [
        { name: 'id', label: 'Product ID:', type: 'text', rules: 'required|numeric' },
        { name: 'name', label: 'Product Name:', type: 'text', rules: 'required' },
        { name: 'price', label: 'Price:', type: 'number', rules: 'required|numeric|min_value:0' },
        { name: 'image', label: 'Image URL:', type: 'text', rules: 'required|url' },
      ],
    };
  },
  setup() {
    const { handleSubmit, errors } = useForm({
      validationSchema: yup.object().shape({
        id: yup.number().required('Product ID required').typeError('ID must be a number'),
        name: yup.string().required('Product name required'),
        price: yup.string()
          .required('Product price required')
          .matches(/^(0|[1-9]\d*)(\.\d+)?$/, 'Price must be a valid number (e.g., 5 or 5.7)'),
        image: yup.string().url('Image URL must be a valid URL').required('Image URL required'),
      }),
    });

    return { handleSubmit, errors };
  },
  computed: {
    isActive() {
      return Object.keys(this.errors).length === 0;
    },
    hasError() {
      return Object.keys(this.errors).length > 0;
    },
  },
  methods: {
    ...mapActions('products', ['addProduct']),
    submitForm() {
      this.handleSubmit((values) => {
        this.addProduct(values);
        this.submitted = true;
        console.log('Product submitted:', values);
      })();
    },
  },
};
</script>

<style scoped>
.product-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
}
button:hover {
  background-color: #218838;
}
button:disabled {
  background-color: lightgray;
  color: darkgray;
  cursor: not-allowed;
  opacity: 0.6;
}
.product-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  background-color: #e9ecef;
}
.product-image {
  max-width: 100%;
  height: auto;
}
.error-message {
  color: red;
}
.active {
  background-color: green;
  color: white;
}
</style>
