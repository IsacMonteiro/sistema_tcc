module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    testMatch: ['**/tests/unit/**/*.spec.js'],
  };  