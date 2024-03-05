const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// POST /recipes/:id/reviews
router.post("/recipes/:id/reviews", ensureLoggedIn, reviewsController.create);

module.exports = router;
