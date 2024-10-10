module.exports = {
  preset: 'ts-jest', // Use the ts-jest preset
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest', // Ensure ts-jest is configured
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
};
