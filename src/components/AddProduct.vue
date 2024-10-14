<template>
  <div class="add-product-form">
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
          class="form-control"
        />
        <ErrorMessage :message="errors[field.name]" class="error-message" />
      </div>
      <button type="submit" class="btn" :disabled="hasError || !isActive">Submit</button>
    </form>
    <div v-if="submitted" class="product-details">
      <h2>Product Details</h2>
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Name:</strong> {{ product.title }}</p>
      <p><strong>Price:</strong> ${{ product.price }}</p>
      <img :src="product.image" alt="Product Image" class="product-image" />
    </div>
  </div>
</template>

<script>
import { useForm, Field } from 'vee-validate';
import * as yup from 'yup';
import ErrorMessage from './ErrorMessage.vue';
import { mapActions } from 'vuex';

export default {
  components: { Field, ErrorMessage },
  data() {
    return {
      product: { id: null, title: '', price: null, image: '' },
      submitted: false,
      fields: [
        { name: 'id', label: 'Product ID:', type: 'number', rules: 'required|numeric' },
        { name: 'title', label: 'Product Name:', type: 'text', rules: 'required' },
        { name: 'price', label: 'Price:', type: 'text', rules: 'required|numeric|min_value:0' },
        { name: 'image', label: 'Image URL:', type: 'text', rules: 'required|url' },
      ],
    };
  },
  setup() {
    const { handleSubmit, errors } = useForm({
      validationSchema: yup.object({
        id: yup.number().required('Product ID required').typeError('ID must be a number'),
        title: yup.string().required('Product name required'),
        price: yup.string().required('Product price required').matches(/^(0|[1-9]\d*)(\.\d+)?$/, 'Price must be a valid number'),
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
      })();
    },
  },
};
</script>
