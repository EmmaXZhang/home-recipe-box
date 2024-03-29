const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plannerSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    breakfast: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
    ],

    lunch: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
    ],

    dinner: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Planner", plannerSchema);
