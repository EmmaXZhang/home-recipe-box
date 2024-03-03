//models
const Shoppinglist = require("../models/shoppinglist");
const Recipe = require("../models/recipe");

async function create(req, res) {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const shoppinglist = await Shoppinglist.create({
      title: recipe.title,
      content: recipe.ingredients,
      recipe: req.body.recipeId,
    });

    res.redirect(`/shoppinglists/${shoppinglist._id}`);
  } catch (err) {
    console.log(err);
  }
  res.end();
}

async function show(req, res) {
  try {
    const shoppinglist = await Shoppinglist.findById(req.params.id);
    res.render("shoppinglists/show", { shoppinglist });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  show,
};
