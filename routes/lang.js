const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", res => {
  res.render("lang");
});

module.exports = router;
