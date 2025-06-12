const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/kushina");

const userSchema = mongoose.Schema({
  id: Number,
  full_name: String,
  email: String,
  username: String,
  password: String,
  role: String,
});

const recipeSchema = mongoose.Schema({
  id: String,
  name: String,
  imageUrl: String,
  author: String,
  category: String,
  ingredients: Array,
  instructions: Array,
  cookingTime: String,
});

const favSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes",
    },
  ],
});
const user = mongoose.model("Users", userSchema);
const recipe = mongoose.model("recipes", recipeSchema);
const fav = mongoose.model("Favourites", favSchema);

module.exports = { user, recipe,fav };
