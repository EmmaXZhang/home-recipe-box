//models
const Recipe = require("../models/recipe");
const Shoppinglist = require("../models/shoppinglist");
const cloudinary = require("../utilities/cloudiary");

//Homepage
async function homePage(req, res) {
  //find first 3 recipes
  const recipes = await Recipe.find({}).sort({ rating: -1 }).limit(3);
  res.render("index", { title: "Home Recipes Box", recipes });
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
    const result = await cloudinary.uploader.upload(req.file.path);

    const recipe = new Recipe({
      ...req.body,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await recipe.save();

    // const recipe = await Recipe.create(req.body);

    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.log(err.message);
    res.render("recipes/new", { title: "Create Recipe", errMsg: err.message });
  }
}

// show recipe detail
async function show(req, res) {
  try {
    console.log("show recipe detail");
    const recipe = await Recipe.findById(req.params.id);
    //find related shoppinglist
    const shoppinglist = await Shoppinglist.findOne({ recipe: req.params.id });

    res.render("recipes/show", { recipe, shoppinglist });
  } catch (e) {
    console.log(e);
  }
}

// edit recipe detail
async function edit(req, res) {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id }).exec();
    if (!recipe) {
      return res.redirect("/recipes");
    }
    res.render("recipes/edit", { recipe });
  } catch (err) {
    console.error("Error retrieving recipe:", err);
    res.redirect("/recipes");
  }
}

// update recipe detail
async function update(req, res) {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.redirect("/recipes");
    }
    res.redirect(`/recipes/${updatedRecipe._id}`);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.redirect("/recipes");
  }
}

async function deleteRecipe(req, res) {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect(`/recipes`);

    // Respond with a success message
    res.status(200).send("Shopping list deleted successfully");
  } catch (error) {
    // Handle errors
    console.log(error);
  }
}

module.exports = {
  homePage,
  index,
  new: newRecipe,
  create,
  show,
  edit,
  update,
  delete: deleteRecipe,
};
