const { Router } = require('express');

const router = Router();
const tripData = {};

/**
 * @description Returns the tripData available on the server
 */
router.get('/data', (req, resp) => resp.status(200).json(tripData));

/**
 * @description Adds a tripData to the app and returns it
 */
router.post('/data', (req, resp) => {
  const { trip, id } = req.body;
  tripData[id] = { ...trip, isSavedTrip: true };

  return resp.status(201).json({});
});

/**
 * @description Returns a 404 error message for unavailable routes
 */
router.use('*', (req, resp) => resp.status(404).json({
  message: 'Route un-available',
}));

module.exports = router;
