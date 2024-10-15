import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter.vue', () => {
  it('renders the title', () => {
    const wrapper = shallowMount(Counter);
    expect(wrapper.find('h1').text()).toBe('Counter');
  });

  it('increments the count when button is clicked', async () => {
    const wrapper = shallowMount(Counter);
    const button = wrapper.find('button');
    
    await button.trigger('click'); // Simulate button click
    expect(wrapper.vm.count).toBe(1); // Check count value
    expect(wrapper.find('p').text()).toBe('Count: 1'); // Check displayed count
  });
});
