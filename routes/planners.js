const express = require("express");
const router = express.Router();
const plannersController = require("../controllers/planners");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /planners/
router.get("/", plannersController.index);

// GET /planners/new
router.get("/new", ensureLoggedIn, plannersController.new);

// POST /planners/
router.post("/", ensureLoggedIn, plannersController.create);

module.exports = router;
