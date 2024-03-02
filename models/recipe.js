const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define the basic schema for the Recipe Model
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    preparationTime: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },
    serving: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Difficulty"],
      required: true,
    },
    ingredients: { type: Array },

    instruction: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Compiling a schema into a model  and export the model
module.exports = mongoose.model("Recipe", recipeSchema);
