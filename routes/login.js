const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", res => {
  res.render("login");
});

module.exports = router;
