const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");

// GET /recipes/
router.get("/", recipesController.index);

// GET /recipes/new
router.get("/new", recipesController.new);

// POST /recipes/
router.post("/", recipesController.create);

// GET /recipes/:id
router.get("/:id", recipesController.show);

module.exports = router;
