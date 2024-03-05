const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const upload = require("../utilities/multer");

// GET /recipes/
router.get("/", recipesController.index);

// GET /recipes/new
router.get("/new", recipesController.new);

// POST /recipes/
router.post("/", upload.single("image"), recipesController.create);

// GET /recipes/:id
router.get("/:id", recipesController.show);

// GET /recipes/:id
router.get("/:id/edit", recipesController.edit);

// PUT /recipes/:id
router.put("/:id", recipesController.update);

// Delet /recipes/:id
router.delete("/:id", recipesController.delete);

// POST /recipes/search
router.post("/search", recipesController.search);

module.exports = router;
