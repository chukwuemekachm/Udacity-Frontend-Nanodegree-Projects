/* eslint-disable prefer-destructuring */
const BASE_API_URL = '/api/v1/data';
const GEO_NAME_USERNAME = process.env.GEO_NAME_USERNAME;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const PIXA_BAY_KEY = process.env.PIXA_BAY_KEY;

export const processData = async ({
  url = BASE_API_URL,
  data,
  method = 'GET',
  headers,
}) => {
  const payload = {
    method,
  };
  if (data) payload.body = JSON.stringify(data);
  if (headers) payload.headers = headers;

  const response = await fetch(url, payload);
  return response.json();
};

export const getGeoNameData = async (searchValue) => {
  const { geonames } = await processData({
    url: `http://api.geonames.org/searchJSON?q=${searchValue}&maxRows=10&username=${GEO_NAME_USERNAME}`,
  });

  return geonames[0];
};

export const getWeatherBitData = async (lat, lng) => {
  const { data, ...rest } = await processData({
    url: `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHER_BIT_KEY}`,
  });

  return { foreCast: data, ...rest };
};

export const getPixaBayImages = async (searchValue) => {
  const { hits } = await processData({
    url: `https://pixabay.com/api/?q=${searchValue}&image_type=photo&key=${PIXA_BAY_KEY}`,
  });

  return hits;
};

export const postTripData = async (trip) => {
  const resp = await processData({ data: { trip, id: trip.id }, method: 'POST' });

  return resp;
};

export const getTripData = async () => {
  const resp = await processData({});

  return resp;
};
