const express = require("express");
const router = express.Router();
const shoppinglistController = require("../controllers/shoppinglists");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /shoppinglists
router.get("/", shoppinglistController.index);

//create a new shoping list
router.post("/", ensureLoggedIn, shoppinglistController.create);

//GET /shoppinglists/:id
router.get("/:id", shoppinglistController.show);

// DELETE /shoppinglists/:id
router.delete("/:id", ensureLoggedIn, shoppinglistController.delete);

// PUT /shoppinglists/:id
router.put("/:id", ensureLoggedIn, shoppinglistController.update);

module.exports = router;
