const {
  handleFormSubmit,
  postTextAPI,
  updateResultSection,
  toggleLoader,
  createSentenceResult,
  validateText,
} = require("../js/main.js");

describe('index js file', function () {
  test('should have validateText', async function () {
    expect(validateText()).toEqual('Please provide some text');
  });

  test('should have handleFormSubmit', async function () {
    expect(handleFormSubmit).toBeDefined();
  });

  test('should have postTextAPI', async function () {
    expect(postTextAPI).toBeDefined();
  });

  test('should have updateResultSection', async function () {
    expect(updateResultSection).toBeDefined();
  });

  test('should have toggleLoader', async function () {
    expect(toggleLoader).toBeDefined();
  });

  test('should have createSentenceResult', async function () {
    expect(createSentenceResult).toBeDefined();
  });
});
