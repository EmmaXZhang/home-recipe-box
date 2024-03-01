//models
const Recipe = require("../models/recipe");

//Homepage
async function homePage(req, res) {
  res.render("index", { title: "Home Recipes Box" });
}

//All recipes
async function index(req, res) {}

module.exports = {
  homePage,
  index,
};
