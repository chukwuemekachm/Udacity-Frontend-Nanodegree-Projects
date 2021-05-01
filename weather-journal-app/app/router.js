const { Router } = require("express");

const router = Router();
const projectData = {};

/**
 * @description Returns the projectData available on the server
 */
router.get("/data", (req, resp) => resp.status(200).json(projectData));

/**
 * @description Adds a projectData to the app and returns it
 */
router.post("/data", (req, resp) => {
  const { date, temp, content } = req.body;
  projectData[date] = { date, temp, content };

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
