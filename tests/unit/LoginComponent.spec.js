import { shallowMount } from '@vue/test-utils';
import LoginForm from '../../src/components/LoginForm.vue';
import axios from 'axios';

jest.mock('axios'); // Mock axios for your tests

describe('LoginForm.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LoginForm);
    expect(wrapper.exists()).toBe(true);
  });

  // Additional tests can be added here
});
