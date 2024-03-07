const express = require("express");
const router = express.Router();
const inspireMeController = require("../controllers/inspireMe.js");

// GET /inspireMe/
router.get("/", inspireMeController.renderPage);

// POST /inspireMe/search
router.post("/search", inspireMeController.searchRecipe);

module.exports = router;
