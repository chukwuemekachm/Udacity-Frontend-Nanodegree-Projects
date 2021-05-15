const request = require('supertest');
const app = require('../index');

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Travel Planner</title>
  <link href="https://fonts.googleapis.com/css?family=Oswald:400,600,700|Ranga:400,700&display=swap" rel="stylesheet">
</head>


<body>
  <div id="background">
    <div class="main__wrapper">

      <header class="header">
        <strong>Travel Planner</strong>
      </header>

      <main class="main">
        <h1>Where are you going to next?</h1>
        <p>Let us know where you're up to next and we can help with insights!</p>
        <button id="plan-trip" class="button">Plan Trip</button>
      </main>

      <div id="dialog-overlay" class="dialog__overlay">
        <dialog class="dialog" id="dialog">
          <div class="dialog__header">
            <h2>Plan your trip</h2>
            <span id="close-dialog" title="close dialog" role="button" aria-roledescription="close dialog button">&#10006;</span>
          </div>
  
          <form id="form">
            <div class="form__field">
              <label for="city-name">Enter city name here</label>
              <input id="city-name" type="text" autocomplete="country-name" placeholder="Enter city name here" required />
            </div>
  
            <div class="form__field">
              <label for="travel-date">What's the date of your trip?</label>
              <input id="travel-date" type="date" placeholder="What's the date of your trip?" required />
            </div>
  
            <div class="form__field">
              <label for="notes">Got some notes about this trip?</label>
              <textarea id="notes" rows="5" cols="50" placeholder="Enter your notes here"></textarea>
            </div>
            <button class="button full-width" type="submit">Generate</button>
          </form>
        </dialog>
      </div>

      <aside class="trips" id="trips">
        <section id="new-trip">
          <h2>New Trips</h2>
          <div id="new-trip-container"></div>
        </section>
        <section id="trip-list">
          <h2>My Trip List</h2>
          <div id="trip-list-container"></div>
        </section>
      </aside>

    </div>
    <img src="https://images.unsplash.com/photo-1542296332-2e4473faf563?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" alt="background overlay">
  </div>

  <div id="loader" class="loader__wrapper">
    <div class="loader__ripple">
      <div></div>
      <div></div>
    </div>
  </div>

  <script src="assets/js/app.js" type="text/javascript"></script>

<script type="text/javascript" src="runtime.js"></script><script type="text/javascript" src="main.js"></script></body>

</html>
`;

describe('/', () => {
  test('should return the client app file', async () => {
    const { text, header: { 'content-type': contentType } } = await request(app).get('/');
    expect(contentType.toLowerCase()).toEqual('text/html; charset=UTF-8'.toLowerCase());
    expect(text.trim()).toEqual(html.trim());
  });

  test('should return a 201', async () => {
    const { status } = await request(app).post('/api/v1/data', {});
    expect(status).toEqual(201);
  });

  test('should return a 404 error', async () => {
    const { body: { message }, status } = await request(app).get('/api/v1/mickey');
    expect(status).toEqual(404);
    expect(message).toEqual('Route un-available');
  });
});
