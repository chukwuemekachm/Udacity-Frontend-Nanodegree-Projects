const { Router } = require("express");

const router = Router();
const postData = {};

/**
 * @description Returns the postData available on the server
 */
router.get("/data", (req, resp) => resp.status(200).json(postData));

/**
 * @description Adds a postData to the app and returns it
 */
router.post("/data", (req, resp) => {
  const { date, temp, content } = req.body;
  postData[date] = { date, temp, content };

  return resp.status(201).json({
    date,
    temp,
    content,
  });
});

/**
 * @description Returns a 404 error message for unavailable routes
 */
router.use("*", (req, resp) =>
  resp.status(404).json({
    message: "Route un-available",
  })
);

module.exports = router;
