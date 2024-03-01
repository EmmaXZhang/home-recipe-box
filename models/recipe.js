const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define the basic schema for the Flight Model
const recipeSchema = new Schema(
  {
    title: String,
    releaseYear: Number,
    mpaaRating: String,
    cast: [String],
    nowShowing: Boolean,
  },
  {
    timestamps: true,
  }
);

//Compiling a schema into a model  and export the model
module.exports = mongoose.model("Recipe", recipeSchema);
