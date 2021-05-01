const request = require('supertest');
const app = require('../index');

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Natural Language Processing</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">
</head>

<body>
  <header class="header">
    <h1 class="header__title">News Article Natural Language Processing</h1>
  </header>

  <main class="main__wrapper">

    <form class="form" id="form">
      <label class="form__label" for="text">Article to process</label>
      <textarea class="form__input" name="text" id="text" cols="30" rows="10"></textarea>
      <button class="form__button" type="submit">Analyze</button>
    </form>

    <section id="text-result">
      <h2>Text Analysis Results</h2>

      <div id="text-result__wrapper"></div>
    </section>

  </main>

  <div id="loader" class="loader__wrapper">
    <div class="loader__ripple">
      <div></div>
      <div></div>
    </div>
  </div>

<script type="text/javascript" src="runtime.js"></script><script type="text/javascript" src="main.js"></script></body>

</html>
`;

describe('/', function () {
  test('should return the client app file', async function () {
    const { text, header: { 'content-type': contentType } } = await request(app).get('/');
    expect(contentType.toLowerCase()).toEqual('text/html; charset=UTF-8'.toLowerCase());
    expect(text.trim()).toEqual(html.trim());
  });

  test('should return a 404 error', async function () {
    const { body: { message }, status } = await request(app).get('/api/v1/mickey');
    expect(status).toEqual(404);
    expect(message).toEqual('Route un-available');
  });
});
