const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define schema for ingredient
const shoppingListSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: Array,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
});

//Compiling a schema into a model  and export the model
module.exports = mongoose.model("Shoppinglist", shoppingListSchema);
