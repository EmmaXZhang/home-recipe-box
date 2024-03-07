//models
const Recipe = require("../models/recipe");
const Shoppinglist = require("../models/shoppinglist");
const Planner = require("../models/planner");
const cloudinary = require("../utilities/cloudiary");

//Homepage
async function homePage(req, res) {
  //find first 3 recipes
  const recipes = await Recipe.find({}).sort({ updatedAt: -1 }).limit(3);
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

    if (
      req.body.preparationTime <= 0 ||
      req.body.cookingTime <= 0 ||
      req.body.serving <= 0 ||
      isNaN(req.body.preparationTime) ||
      isNaN(req.body.cookingTime) ||
      isNaN(req.body.serving)
    ) {
      throw new Error(
        "Preparation time, cooking time and serving number must be positive numbers."
      );
    }

    const recipe = new Recipe({
      ...req.body,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await recipe.save();

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

// delete a recipe
async function deleteRecipe(req, res) {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect(`/recipes`);

    res.status(200).send("Shopping list deleted successfully");
  } catch (error) {
    console.log(error);
  }
}

// search a recipe
async function search(req, res) {
  try {
    let { searchTerm } = req.body;
    // let recipes = await Recipe.find({
    //   $text: { $search: searchTerm, $diacriticSensitive: false },
    // });
    const recipes = await Recipe.find({
      title: { $regex: new RegExp(searchTerm, "i") }, // Perform a case-insensitive partial match search on the title
    });
    res.render("recipes/search", { recipes });
  } catch (err) {
    console.log(err);
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
  search,
};
