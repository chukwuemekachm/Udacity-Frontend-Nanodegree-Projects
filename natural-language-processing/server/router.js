const { Router } = require("express");
const fetch = require("node-fetch");

const { TEXT_2_DATA_API_SECRET = "", TEXT_2_DATA_API_KEY = "" } = process.env;
const router = Router();

/**
 * @description Analyze the text
 */
router.post("/data", async (req, resp, next) => {
  const { text } = req.body;
  try {
    const res = await fetch("http://api.text2data.com/v3/analyze", {
      method: "post",
      body: JSON.stringify({
        PrivateKey: TEXT_2_DATA_API_KEY,
        DocumentText: text,
        Secret: TEXT_2_DATA_API_SECRET,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    return resp.status(200).json(json);
  } catch (error) {
    next(error);
  }
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
