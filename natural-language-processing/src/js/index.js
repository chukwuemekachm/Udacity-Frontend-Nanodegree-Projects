import { registerSW } from './register-sw';
import '../scss/style.scss';

const BASE_URL = "/api/v1/data";
const headers = {
  "Content-Type": "application/json",
};

const form = document.getElementById('form');
const input = document.getElementById("text");
const loader = document.getElementById("loader");
const textResult = document.getElementById("text-result");
const textResultWrapper = document.getElementById("text-result__wrapper");

function toggleLoader(value = false) {
  loader.style.display = value ? "flex" : "none";
}

function createSentenceResult(params) {
  const element = document.createElement('div');
  element.innerHTML = `
    <span><strong>${params.Text}</strong></span>
    <div class="score">
      <span class="score__indicator ${params.SentimentResultString}"></span>
      <span class="score__text">${params.SentimentResultString}</span>
      <span class="score__value">${params.SentimentValue}</span>
    </div>
  `;
  return element;
}

function TODO(params) {
  const fragment = document.createDocumentFragment();

  params.CoreSentences.forEach((result) => {
    fragment.appendChild(createSentenceResult(result));
  });

  textResultWrapper.innerHTML = '';
  textResultWrapper.appendChild(fragment);
  textResult.style.display = 'block';
}

function postTextAPI(path, data) {
  fetch(path, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => {
    toggleLoader();
    return res.json();
  }).then(res => TODO(res));
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!input.value) return;

  toggleLoader(true);
  postTextAPI(BASE_URL, { text: input.value })
}

form.addEventListener('submit', handleFormSubmit);
registerSW();
