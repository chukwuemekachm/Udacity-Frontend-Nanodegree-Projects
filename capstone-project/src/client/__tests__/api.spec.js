const {
  processData,
  getGeoNameData,
  getPixaBayImages,
  getTripData,
  getWeatherBitData,
  postTripData,
} = require('../js/api');

describe('index js file', () => {
  test('should have processData', async () => {
    expect(processData).toBeDefined();
  });

  test('should have getGeoNameData', async () => {
    expect(getGeoNameData).toBeDefined();
  });

  test('should have getTripData', async () => {
    expect(getTripData).toBeDefined();
  });

  test('should have getPixaBayImages', async () => {
    expect(getPixaBayImages).toBeDefined();
  });

  test('should have getWeatherBitData', async () => {
    expect(getWeatherBitData).toBeDefined();
  });

  test('should have postTripData', async () => {
    expect(postTripData).toBeDefined();
  });
});
