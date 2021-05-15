const { registerSW } = require('../js/register-sw');

describe('register-sw js file', function () {
  test('should have registerSW', async function () {
    expect(registerSW).toBeDefined();
  });
});
