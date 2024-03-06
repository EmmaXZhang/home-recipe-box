const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const upload = require("../utilities/multer");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /recipes/
router.get("/", recipesController.index);

// GET /recipes/new
router.get("/new", ensureLoggedIn, recipesController.new);

// POST /recipes/
router.post(
  "/",
  upload.single("image"),
  ensureLoggedIn,
  recipesController.create
);

// GET /recipes/:id
router.get("/:id", recipesController.show);

// GET /recipes/:id
router.get("/:id/edit", ensureLoggedIn, recipesController.edit);

// PUT /recipes/:id
router.put("/:id", ensureLoggedIn, recipesController.update);

// Delet /recipes/:id
router.delete("/:id", ensureLoggedIn, recipesController.delete);

// POST /recipes/search
router.post("/search", recipesController.search);

module.exports = router;
