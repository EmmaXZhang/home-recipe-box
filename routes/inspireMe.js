const express = require("express");
const router = express.Router();
const inspireMeController = require("../controllers/inspireMe.js");
const upload = require("../utilities/multer");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /inspireMe/
router.get("/", inspireMeController.renderPage);

// POST /inspireMe/search
router.post("/search", inspireMeController.searchRecipe);

module.exports = router;
