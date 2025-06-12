const z = require("zod");

const recipeSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  ingredients: z.array(z.object({ name: z.string(), quantity: z.string() })),
  instructions: z.array(z.string()),
  cookingTime: z.string(),
});

function recipeInputValidation(req, res, next) {
  if(!req.body){
    res.status(500).json({error:"the request body is empty"})
    return
  }
  
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const category = req.body.category;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;
  const cookingTime = req.body.cookingTime;

  const recipeInput = {
    name,
    imageUrl,
    category,
    ingredients,
    instructions,
    cookingTime,
  };

  console.log(recipeInput);
  // console.log(recipeSchema); 
  const checkRecipeInput = recipeSchema.safeParse(recipeInput);

  if (!checkRecipeInput.success) {
    res.status(400).json({
      error:
        checkRecipeInput.error.issues[0].path +
        " " +
        checkRecipeInput.error.issues[0].message,
    });
  } else {
    next();
  }
}

module.exports = recipeInputValidation;
