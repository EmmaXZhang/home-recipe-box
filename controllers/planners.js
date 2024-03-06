const Recipe = require("../models/recipe");
const Planner = require("../models/planner");

async function newPlanner(req, res) {
  try {
    const breakfast = await Recipe.find({ category: "Breakfast" }).select(
      "title"
    );
    const lunch = await Recipe.find({ category: "Lunch" }).select("title");
    const dinner = await Recipe.find({ category: "Dinner" }).select("title");

    res.render("planners/new", { breakfast, lunch, dinner });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    // Handle the error gracefully, maybe render an error page or redirect
    res.status(500).send("Internal Server Error");
  }
}

async function create(req, res) {
  try {
    const planner = new Planner({
      date: date,
      breakfast: req.body.breakfastChoice,
      lunch: req.body.lunchChoice,
      dinner: req.body.dinnerChoice,
    });
    await planner.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  new: newPlanner,
  create,
};
