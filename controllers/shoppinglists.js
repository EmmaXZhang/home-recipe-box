//models
const Shoppinglist = require("../models/shoppinglist");
const Recipe = require("../models/recipe");

async function create(req, res) {
  try {
    const recipeId = req.body.recipeId;

    const existingShoppinglist = await Shoppinglist.findOne({
      recipe: recipeId,
    });

    if (existingShoppinglist) {
      // update existingShopping list with new one
      const recipe = await Recipe.findById(recipeId);
      const shoppinglistContent = recipe.ingredients.map((ingredient) => ({
        name: ingredient,
        checked: false,
      }));

      const updatedShoppinglist = await Shoppinglist.findOneAndUpdate(
        { recipe: recipeId },
        { $set: { title: recipe.title, ingredients: shoppinglistContent } },
        { new: true }
      );
      res.redirect(`/shoppinglists/${updatedShoppinglist._id}`);
    } else {
      // no existing one, create a new one
      const recipe = await Recipe.findById(recipeId);
      const shoppinglistContent = recipe.ingredients.map((ingredient) => ({
        name: ingredient,
        checked: false,
      }));

      const shoppinglist = await Shoppinglist.create({
        title: recipe.title,
        ingredients: shoppinglistContent,
        recipe: recipeId,
      });

      res.redirect(`/shoppinglists/${shoppinglist._id}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to create or update shopping list");
  }
}

async function show(req, res) {
  try {
    const shoppinglist = await Shoppinglist.findById(req.params.id);
    res.render("shoppinglists/show", { shoppinglist });
  } catch (err) {
    console.log(err);
  }
}

async function index(req, res) {
  try {
    const shoppinglists = await Shoppinglist.find({});
    res.render("shoppinglists/index", { shoppinglists });
  } catch (err) {
    console.log(err);
  }
}

async function deleteShoppinglist(req, res) {
  try {
    const deletedShoppinglist = await Shoppinglist.findByIdAndDelete(
      req.params.id
    );
    res.redirect(`/shoppinglists`);

    if (!deletedShoppinglist) {
      return res.status(404).send("Shopping list not found");
    }
    // Respond with a success message
    res.status(200).send("Shopping list deleted successfully");
  } catch (error) {
    // Handle errors
    console.log("Error deleting shopping list:", error);
  }
}

module.exports = {
  create,
  show,
  index,
  delete: deleteShoppinglist,
};
