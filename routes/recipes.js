const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");

// GET /recipes/
router.get("/", recipesController.index);

module.exports = router;
