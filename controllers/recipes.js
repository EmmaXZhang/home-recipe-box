//models
const Recipe = require("../models/recipe");

//Homepage
async function homePage(req, res) {
  res.render("index", { title: "Home Recipes Box" });
}

//All recipes
async function index(req, res) {
  const recipes = await Recipe.find({});
  res.render("recipes/index", { title: "All Recipes", recipes });
}

// new recipe form
function newRecipe(req, res) {
  res.render("recipes/new", { title: "Add Recipe", errMsg: "" });
}

// create recipe
async function create(req, res) {
  try {
    const recipe = await Recipe.create(req.body);

    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.log(err.message);
    res.render("recipes/new", { title: "Create Recipe", errMsg: err.message });
  }
}

// show recipe detail
async function show(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    console.log("recipe", recipe);
    res.render("recipes/show", { recipe: recipe });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  homePage,
  index,
  new: newRecipe,
  create,
  show,
};
