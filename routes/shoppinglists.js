const express = require("express");
const router = express.Router();
const shoppinglistController = require("../controllers/shoppinglists");

//create a new shoping list
router.post("/", shoppinglistController.create);

//GeT /shoppinglists/:id
router.get("/:id", shoppinglistController.show);

module.exports = router;
