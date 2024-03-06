const express = require("express");
const router = express.Router();
const plannersController = require("../controllers/planners.js");
const upload = require("../utilities/multer");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /planners/new
router.get("/new", plannersController.new);

// POST /planners/
router.post("/", plannersController.create);

module.exports = router;
