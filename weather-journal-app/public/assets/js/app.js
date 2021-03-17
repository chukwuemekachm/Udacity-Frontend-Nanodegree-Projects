const API_KEY = "a761f6090d8f0caa282cd247e2206a77";
const BASE_URL = "/api/v1/data";
const headers = {
  "Content-Type": "application/json",
};

// DOM UI
const button = document.getElementById("generate");
const input = document.getElementById("zip");
const textArea = document.getElementById("feelings");
const temperature = document.getElementById("temperature-value");
const locationEl = document.getElementById("location-value");
const locationTime = document.getElementById("location-time");
const journalList = document.getElementById("entryHolder");
const loader = document.getElementById("loader");

function formatDate(_date = "") {
  const [day, month, date, year, time] = String(new Date(_date)).split(" ");
  return `at ${time} - ${day}, ${date} ${month} ${year}`;
}

function toggleLoader(value = false) {
  loader.style.display = value ? "flex" : "none";
}

function clearForm() {
  input.value = "";
  textArea.value = "";
}

function createJournalComponent(data) {
  const component = document.createElement("div");
  component.classList.add("journal");
  component.innerHTML = `
    <div class="journal__temp_wrapper">
      <p class="journal__temperature">
        <strong>${data.temp}</strong>
        <sup>o</sup>
      </p>
      <p class="journal__date">${formatDate(data.date)}</p>
    </div>
    <p class="journal__content">${data.content}</p>
  `;
  return component;
}

function updateCityWeatherInfo(resp) {
  temperature.innerHTML = resp.main.temp;
  locationEl.innerHTML = resp.name;
  locationTime.innerHTML = formatDate(new Date());
}

function updateUserWeatherJournal(resp) {
  const fragment = document.createDocumentFragment();
  Object.values(resp).forEach((data) => {
    fragment.insertBefore(createJournalComponent(data), fragment.firstChild);
  });
  journalList.innerHTML = "";
  journalList.appendChild(fragment);
  toggleLoader();
  clearForm();
}

function getWeatherDataAPI() {
  fetch(BASE_URL, { headers })
    .then((res) => res.json())
    .then((resp) => {
      updateUserWeatherJournal(resp);
    });
}

function postWeatherDataAPI(path, data) {
  fetch(path, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then(() => {
    getWeatherDataAPI();
  });
}

function getWeatherData(zipCode) {
  if (!zipCode) return;

  toggleLoader(true);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((resp) => {
      updateCityWeatherInfo(resp);
      postWeatherDataAPI(BASE_URL, {
        date: new Date(),
        temp: resp.main.temp,
        content: textArea.value,
      });
    })
    .catch(() => toggleLoader());
}

function handleGenerateClick(event) {
  event.preventDefault();
  getWeatherData(input.value);
}

getWeatherDataAPI();

button.addEventListener("click", handleGenerateClick);
