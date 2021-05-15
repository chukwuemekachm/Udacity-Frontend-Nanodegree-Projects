import {
  getGeoNameData, getPixaBayImages, getWeatherBitData, postTripData,
} from './api';

const imageURLs = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2208&q=80',
  'https://images.unsplash.com/photo-1526581671404-349f224db79b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1225&q=80',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
];

// DOM UI
const cityName = document.getElementById('city-name');
const travelDate = document.getElementById('travel-date');
const textArea = document.getElementById('notes');
export const form = document.getElementById('form');
export const planTripButton = document.getElementById('plan-trip');
export const dialog = document.getElementById('dialog');
export const dialogOverlay = document.getElementById('dialog-overlay');
export const closeDialog = document.getElementById('close-dialog');
export const trips = document.getElementById('trips');
export const tripListContainer = document.getElementById('trip-list-container');
export const newTripContainer = document.getElementById('new-trip-container');
const loader = document.getElementById('loader');
const background = document.getElementById('background');
const projectTripsData = localStorage.getItem('TRIPS') ? JSON.parse(localStorage.getItem('TRIPS')) : {};

const clearForm = () => {
  cityName.value = '';
  textArea.value = '';
  travelDate.value = '';
};

const formatDate = (_date = '') => {
  const [day, month, date, year] = String(new Date(_date)).split(' ');
  return `${day}, ${date} ${month} ${year}`;
};

const getDateDiff = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const toggleLoader = (value = false) => {
  loader.style.display = value ? 'flex' : 'none';
};

const toggleTrips = (value = false) => {
  trips.style.display = value ? 'flex' : 'none';
};

export const toggleDialog = (value = false) => {
  dialog.style.display = value ? 'block' : 'none';
  dialogOverlay.style.display = value ? 'block' : 'none';
};

const createTripComponent = (data) => {
  const component = document.createElement('div');
  component.classList.add('trip__card');
  component.setAttribute('id', data.id);
  component.innerHTML = `
    <img src="${data.imageURL}" alt="" class="trip__card__image">
    <div class="trip__card__info">
      <div>
        <p class="title">
          <strong>
            <span>My Trip to ${data.name}, ${data.countryName}</span>
            <br />
            <span>Departing: ${formatDate(data.travelDate)}</span>
          </strong>
        </p>
      </div>
      <div class="actions">
        ${
  data.isSavedTrip
    ? `<button id="remove-trip" data-trip-id="${data.id}" class="button small outlined">Remove Trip</button>`
    : `<button id="save-trip" data-trip-id="${data.id}"  class="button small">Save Trip</button>`
}
      </div>
      <div class="weather">
        <p>${data.name}, ${data.countryName} is ${getDateDiff(new Date(), new Date(data.travelDate))} days away</p>
        <p>
          Typical weather for then is
          <span>High - ${data.maxTemp}, Low - ${data.minTemp}</span>
          <span>${data.weatherDescription}</span>
        </p>
      </div>
    </div>
  `;
  return component;
};

const addTripToDom = (tripData) => {
  const component = createTripComponent(tripData);

  if (tripData.isSavedTrip) {
    tripListContainer.appendChild(component);
  } else {
    newTripContainer.insertBefore(component, newTripContainer.firstChild);
  }

  toggleTrips(true);
};

export const handleTripSubmit = async (event) => {
  event.preventDefault();
  toggleLoader(true);
  const geoNameData = await getGeoNameData(cityName.value);
  const { foreCast } = await getWeatherBitData(
    geoNameData.lat,
    geoNameData.lng,
  );
  const hits = await getPixaBayImages(String(cityName.value).replace(' ', '+'));
  const tripData = {
    name: geoNameData.name,
    countryName: geoNameData.countryName,
    lat: geoNameData.lat,
    lng: geoNameData.lng,
    travelDate: travelDate.value,
    weatherDescription: foreCast[0].weather.description,
    minTemp: foreCast[0].app_min_temp,
    maxTemp: foreCast[0].app_max_temp,
    imageURL: hits[0] ? hits[0].webformatURL : 'https://cdn.pixabay.com/photo/2016/03/22/04/23/map-1272165__340.png',
    isSavedTrip: false,
    id: new Date().getMilliseconds().toString(),
    notes: textArea.value,
  };

  addTripToDom(tripData);
  clearForm();
  toggleDialog();
  toggleLoader();

  projectTripsData[tripData.id] = tripData;
  localStorage.setItem('TRIPS', JSON.stringify(projectTripsData));
};

const imageMap = {};

export const loadBackgroundImage = async (url) => new Promise((resolve, reject) => {
  if (imageMap[url]) return resolve(imageMap[url]);

  const image = new Image();
  image.onload = () => {
    imageMap[url] = image;
    resolve(image);
  };
  image.onerror = reject;
  image.src = url;
});

export const updateBackgroundImage = async () => {
  let counter = 0;

  setInterval(async () => {
    if (counter === imageURLs.length) counter = 0;
    const image = await loadBackgroundImage(imageURLs[counter]);

    if (background.lastChild.nodeName === 'IMG') {
      background.replaceChild(image, background.lastChild);
    } else {
      background.appendChild(image);
    }

    counter += 1;
  }, 7000);
};

export const handleSaveTrip = async (event) => {
  if (event.target.id === 'save-trip') {
    const trip = projectTripsData[event.target.attributes['data-trip-id'].value];
    await postTripData(trip);
    trip.isSavedTrip = true;
    projectTripsData[trip.id] = trip;
    newTripContainer.removeChild(document.getElementById(trip.id));
    addTripToDom(trip);
    localStorage.setItem('TRIPS', JSON.stringify(projectTripsData));
  }
};

if (Object.keys(projectTripsData)) {
  Object.values(projectTripsData).forEach((obj) => {
    if (obj.id) {
      addTripToDom(obj);
    }
  });
}
