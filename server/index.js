const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userInputValidation = require("./middlewares/userInputValidation");
const validateUser = require("./middlewares/validateUser");
const validateAdmin = require("./middlewares/validateAdmin");
const recipeInputValidation = require("./middlewares/recipeInputValidation");
const LoginInputValidation = require("./middlewares/loginInputValidation");
const { user } = require("./db/index");
const { recipe } = require("./db/index");
const { fav } = require("./db/index");
const JWT_PASS = "secret1234";

const app = express();
app.use(express.json());
app.use(cors());
// Sign up
app.post("/signup", userInputValidation, async (req, res) => {
  const full_name = req.body.full_name;
  const email = req.body.email;
  const username = req.body.username?.toLowerCase();
  const password = req.body.password;
  const role = req.body.role;

  //   check if user exists
  const checkEmail = await user.find({ email });
  if (checkEmail.length > 0) {
    res.status(409).json({ error: "Email already in use" });
    return;
  }
  //   check if username is taken
  const checkUsername = await user.find({ username });
  if (checkUsername.length > 0) {
    res
      .status(409)
      .json({ error: "Username is taken, please choose a different one" });
    return;
  }

  //   create the user
  try {
    user.create({ full_name, email, username, password, role });
    res.status(200).json({ msg: "user created" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Login
app.post("/login", LoginInputValidation, async (req, res) => {
  const username = req.body.username?.toLowerCase();
  const password = req.body.password;

  // check if user exists
  const userExist = await user.findOne({ username });
  if (!userExist) {
    res.status(404).json({ error: "No user found with this username" });
    return;
  }
  // check password
  const userPass = await user.findOne({ username, password });

  if (!userPass) {
    res.status(401).json({ error: "Wrong password" });
    return;
  }

  // create token
  try {
    const newUser = {
      full_name: userPass.full_name,
      username: userPass.username,
      role: userPass.role,
    };
    const token = jwt.sign(newUser, JWT_PASS);

    res.status(200).json(token);
  } catch (err) {
    res.status(501).json({ error: err });
  }
});

// Create Recipe
app.post(
  "/recipe/create",
  validateAdmin,
  recipeInputValidation,
  async (req, res) => {
    const currentUser = req.currentUser;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const author = currentUser.full_name;
    const category = req.body.category;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const cookingTime = req.body.cookingTime;

    const modIngredients = ingredients.map((ing) => {
      return {
        id: Math.floor(Math.random() * 10000),
        name: ing.name,
        quantity: ing.quantity,
      };
    });

    try {
      const exists = await recipe.findOne({ id: name.split(" ").join("-") });
      if (exists) {
        res.status(409).json({ msg: "this recipe already exits" });
        return;
      }
      await recipe.create({
        id: name.split(" ").join("-"),
        name,
        imageUrl,
        author,
        category,
        ingredients: modIngredients,
        instructions,
        cookingTime,
      });
      res.status(200).json({ msg: "recipe created" });
    } catch (err) {
      res.status(500).json({ msg: `failed to create recipe ` + err });
    }
  }
);

// Get Recipes
app.get("/recipes", validateUser, async (req, res, next) => {
  try {
    const recipes = await recipe.find({});

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Edit Recipe
app.put(
  "/recipes/edit/:id",
  validateAdmin,
  recipeInputValidation,
  async (req, res) => {
    const currentId = req.params.id;

    // check if the recipe exists
    const recipeExists = await recipe.findOne({ id: currentId });
    if (!recipeExists) {
      res.status(404).json({ error: `a recipe with this id does not eixist` });
      return;
    }

    // update recipe
    const currentUser = req.currentUser;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const author = currentUser.full_name;
    const category = req.body.category;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const cookingTime = req.body.cookingTime;

    const modIngredients = ingredients.map((ing) => {
      return {
        id: Math.floor(Math.random() * 10000),
        name: ing.name,
        quantity: ing.quantity,
      };
    });

    try {
      await recipe.updateOne(
        { id: currentId },
        {
          id: name.split(" ").join("-"),
          name,
          imageUrl,
          author,
          category,
          ingredients: modIngredients,
          instructions,
          cookingTime,
        }
      );
      res.status(200).json({ msg: "recipe updated" });
    } catch (err) {}
  }
);

// Delete recipe
app.delete("/recipes/delete/:id", validateAdmin, async (req, res) => {
  const currentId = req.params.id;

  // check if recipe exists
  checkRecipe = await recipe.findOne({ id: currentId });
  if (!checkRecipe) {
    res.status(404).json({ error: "a recipe with this id does not exist" });
    return;
  }

  try {
    await recipe.deleteOne({ id: currentId });
    res.status(200).json({ msg: "recipe deleted" });
  } catch (err) {
    res.sendStatus(500).json({ error: err });
  }
});

app.post("/fav", validateUser, async (req, res) => {
  const currentUser = req.currentUser;
  const recipeId = req.body.id;
  const myUser = await user.findOne({ id: currentUser.id }); //user object from db
  const userId = myUser._id; //oj id of the user
  const userFav = await fav.findOne({ user: userId });//fav collection obj of the user
  const currentRecipe = await recipe.findOne({ id: recipeId });
console.log(userFav)
  if (!currentRecipe) {
    res.status(404).json({ error: "no recipe found" });
    return;
  }
  const myRecipe = currentRecipe._id;//obj id of the recipe

  try {
    if (!userFav) {
      await fav.create({
        user: userId,
        recipes: [myRecipe],
      });
    } else {
      if(userFav.recipes.includes(myRecipe)){
        res.status(409).json({error:"alreadey included"})
        return
      }
      await fav.updateOne(
        { user: userId },
        { recipes: [...userFav.recipes, myRecipe] }
      );
    }
    res.status(200).json({ msg: "recipe added to favourites" });
  } catch (err) {
    res.send(err);
  }
});
app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("running at 3000");
});
