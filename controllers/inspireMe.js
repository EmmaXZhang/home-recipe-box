const axios = require("axios");

async function renderPage(req, res) {
  try {
    res.render("inspireMe", { recipes: [] });
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Error rendering page");
  }
}

// Define the searchRecipe function
async function searchRecipe(req, res) {
  try {
    const { recipeName } = req.body;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`
    );
    // Extract recipe "meals" object from response
    var recipes = response.data.meals;
    // only display 3 result
    recipes = recipes.slice(0, 3);
    res.render("inspireMe", { recipes: recipes || [] });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).send("Error fetching recipe");
  }
}

module.exports = {
  renderPage,
  searchRecipe,
};
