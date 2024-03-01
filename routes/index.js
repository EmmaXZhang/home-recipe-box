var express = require("express");
var router = express.Router();
const recipesController = require("../controllers/recipes");

/* GET home page. */
router.get("/", recipesController.homePage);

module.exports = router;
