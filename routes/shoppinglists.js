const express = require("express");
const router = express.Router();
const shoppinglistController = require("../controllers/shoppinglists");
const shoppinglist = require("../models/shoppinglist");

// GET /shoppinglists
router.get("/", shoppinglistController.index);

//create a new shoping list
router.post("/", shoppinglistController.create);

//GET /shoppinglists/:id
router.get("/:id", shoppinglistController.show);

// DELETE /shoppinglists/:id
router.delete("/:id", shoppinglistController.delete);

// PUT /shoppinglists/:id
router.put("/:id", shoppinglistController.update);

module.exports = router;
