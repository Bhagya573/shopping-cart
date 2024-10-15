export default {
  beforeMount(el) {
    const trimValue = (event) => {
      const originalValue = el.value;
      el.value = originalValue.trim();

      // Emit an input event only if the value has changed
      if (el.value !== originalValue) {
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    el._trimValueHandler = trimValue;
    el.addEventListener('input', trimValue);
  },
  
  unmounted(el) {
    el.removeEventListener('input', el._trimValueHandler);
  },
};
