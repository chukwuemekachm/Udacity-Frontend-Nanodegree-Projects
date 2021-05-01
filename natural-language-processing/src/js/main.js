const BASE_URL = "/api/v1/data";
const headers = {
  "Content-Type": "application/json",
};

const form = document.getElementById('form');
const input = document.getElementById("text");
const loader = document.getElementById("loader");
const textResult = document.getElementById("text-result");
const textResultWrapper = document.getElementById("text-result__wrapper");

export function toggleLoader(value = false) {
  loader.style.display = value ? "flex" : "none";
}

export function createSentenceResult(params) {
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

export function updateResultSection(params) {
  const fragment = document.createDocumentFragment();

  params.CoreSentences.forEach((result) => {
    fragment.appendChild(createSentenceResult(result));
  });

  textResultWrapper.innerHTML = '';
  textResultWrapper.appendChild(fragment);
  textResult.style.display = 'block';
}

export function postTextAPI(path, data) {
  fetch(path, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => {
    toggleLoader();
    return res.json();
  }).then(res => updateResultSection(res));
}

export function validateText(text) {
  if (!text || text.length < 1) return 'Please provide some text';

  return false;
}

export function handleFormSubmit(event) {
  event.preventDefault();

  const inValidText = validateText(input.value);

  if (inValidText) return alert(inValidText);

  toggleLoader(true);
  postTextAPI(BASE_URL, { text: input.value })
}
