//models
const Shoppinglist = require("../models/shoppinglist");
const Recipe = require("../models/recipe");

async function create(req, res) {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    //using map to create a new array
    const shoppinglistContent = recipe.ingredients.map((ingredient) => ({
      name: ingredient,
      checked: false,
    }));

    const shoppinglist = await Shoppinglist.create({
      title: recipe.title,
      ingredients: shoppinglistContent,
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

async function index(req, res) {
  try {
    const shoppinglists = await Shoppinglist.find({});
    res.render("shoppinglists/index", { shoppinglists });
  } catch (err) {
    console.log(err);
  }
}

//update shoppinglist
async function update(req, res) {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const shoppinglistContent = recipe.ingredients.map((ingredient) => ({
      name: ingredient,
      checked: false,
    }));

    const updatedShoppingList = await Shoppinglist.findOneAndUpdate(
      { _id: req.body.shoppinglistId },
      { $set: { ingredients: shoppinglistContent } },
      { new: true }
    );
    res.redirect("/shoppinglists");
  } catch (error) {
    // Handle errors
    console.error("Error updating shopping list:", error);
    res.status(500).send("Failed to update shopping list");
  }
}

async function deleteShoppinglist(req, res) {
  // req.params.id -> review's id
  //req.params.id -> review's id
  // pass req.user id to reviews.user, making sure current user delete his own review
  const shoppinglist = await Shoppinglist.findOne({
    "shoppinglists._id": req.params.id,
  });
  // Rogue user!
  if (!shoppinglist) return res.redirect("/shoppinglists");
  // Remove the review using the remove method available on Mongoose arrays
  movie.reviews.remove(req.params.id);
  // Save the updated movie doc
  await movie.save();
  // Redirect back to the movie's show view
  res.redirect(`/movies/${movie._id}`);
}

module.exports = {
  create,
  show,
  index,
  update,
};
