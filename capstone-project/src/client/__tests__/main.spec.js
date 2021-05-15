const {
  handleSaveTrip,
  handleTripSubmit,
  loadBackgroundImage,
  updateBackgroundImage,
  toggleDialog,
} = require('../js/main');

describe('index js file', () => {
  test('should have handleSaveTrip', async () => {
    expect(handleSaveTrip).toBeDefined();
  });

  test('should have handleTripSubmit', async () => {
    expect(handleTripSubmit).toBeDefined();
  });

  test('should have loadBackgroundImage', async () => {
    expect(loadBackgroundImage).toBeDefined();
  });

  test('should have updateBackgroundImage', async () => {
    expect(updateBackgroundImage).toBeDefined();
  });

  test('should have toggleDialog', async () => {
    expect(toggleDialog).toBeDefined();
  });
});
