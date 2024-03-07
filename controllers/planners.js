const Recipe = require("../models/recipe");
const Planner = require("../models/planner");

async function newPlanner(req, res) {
  try {
    const breakfast = await Recipe.find({ category: "Breakfast" });
    const lunch = await Recipe.find({ category: "Lunch" });
    const dinner = await Recipe.find({ category: "Dinner" });

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
      date: req.body.date,
      breakfast: req.body.breakfastChoice,
      lunch: req.body.lunchChoice,
      dinner: req.body.dinnerChoice,
    });
    // console.log("planner", planner);
    await planner.save();
    res.redirect("/planners");
  } catch (err) {
    console.log(err);
  }
}

async function index(req, res) {
  try {
    const planners = await Planner.find({}).populate("breakfast lunch dinner");

    res.render("planners/index", { planners });
  } catch (error) {
    console.error("Error fetching planners:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  new: newPlanner,
  create,
  index,
};
