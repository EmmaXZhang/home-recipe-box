const Recipe = require("../models/recipe");

async function create(req, res) {
  //   const recipeId = req.params.userId;
  console.log("recipeid", req.params);
  const recipe = await Recipe.findById(req.params.id);
  // Add the user-centric info to req.body (the new review)
  // req.body.user = req.user._id;
  // req.body.userName = req.user.name;
  // req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays

  recipe.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await recipe.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/recipes/${recipe._id}`);
}

module.exports = {
  create,
};
