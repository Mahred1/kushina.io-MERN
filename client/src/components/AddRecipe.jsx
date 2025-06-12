import { useReducer, useState } from "react";
import { useRecipe } from "../contexts/RecipesContext";
import IngredientTag from "./IngredientTag";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

function AddRecipe({ onsetAdd }) {
  const { addRecipe } = useRecipe();
  const { user } = useAuth();
  function handleSetAdd() {
    onsetAdd((add) => !add);
  }

  function handleAddRecipe(e) {
    e.preventDefault();
    if (
      name === "" ||
      instructions === "" ||
      cookingTime === "" ||
      imageUrl === ""
    ) {
      alert("fields are empty!!");
      return;
    }
    const newRecipe = {
      name,
      imageUrl,
      author: user?.full_name,
      category,
      ingredients: ingredients.map((ing) => {
        return { name: ing.name, quantity: ing.quantity };
      }),
      instructions,
      cookingTime,
    };
    addRecipe(newRecipe);
    onsetAdd(false);
  }
  //   function handleUpdateRecipe(e) {
  //     e.preventDefault()
  //     const updatedRecipes = recipes.map((recipe) => {
  //   return recipe===currentRecipe ? {...recipe,name,imageUrl,category,instructions,cookingTime}:recipe

  //     });

  //     updateRecipes(updatedRecipes)
  //     onSetEdit(false)
  //   }
  function reducer(state, action) {
    switch (action.type) {
      case "category":
        return { ...state, category: action.payload };
      case "name":
        return { ...state, name: action.payload };
      case "imageUrl":
        return { ...state, imageUrl: action.payload };
      case "instructions":
        return { ...state, instructions: action.payload.split(";") };
      case "cookingTime":
        return { ...state, cookingTime: action.payload };
      case "ingredients/add":
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
        };
      case "ingredients/update":
        return { ...state, ingredients: action.payload };

      default:
        console.log("unknown action type");
        break;
    }
  }
  const initialState = {
    name: "",
    imageUrl: "curry.jpg",
    category: "Veg",
    instructions: [""],
    cookingTime: "",
    ingredients: [],
  };
  const [
    { name, imageUrl, category, instructions, cookingTime, ingredients },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [currentIng, setCurrentIng] = useState("");
  const [currentQaunt, setCurrentQuant] = useState("");

  function handleAddIng(e) {
    e.preventDefault();
    if (currentIng === "" || currentQaunt === "") {
      alert("fields are empty");
      return;
    }
    const newIng = {
      id: Math.floor(Math.random() * 100000),
      name: currentIng,
      quantity: currentQaunt,
    };
    dispatch({ type: "ingredients/add", payload: newIng });
    setCurrentIng("");
    setCurrentQuant("");
  }
  function handleUpdateIng(newIngs) {
    dispatch({ type: "ingredients/update", payload: newIngs });
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-2 text-white top-[5%] left-[40%]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleSetAdd}
          className="fixed top-0 left-0 min-w-screen min-h-screen bg-[#0000005b] z-[-1]"
        />
        <motion.form
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
          className="bg-[#fff] text-black flex flex-col gap-3 px-5 py-7 w-[450px] rounded-md"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            width={20}
            src="close.svg"
            onClick={handleSetAdd}
            className="select-none cursor-pointer absolute left-[92%] top-[1.8%]"
          />
          <div className="flex flex-col ">
            <lable className="font-medium capitalize text-lg">name</lable>
            <input
              value={name}
              onChange={(e) =>
                dispatch({ type: "name", payload: e.target.value })
              }
              className="outline-[#ccc] border-1 rounded-sm px-1 py-2 border-[#ccc]"
              placeholder="Avocado Salad"
            ></input>
          </div>
          <div className="flex flex-col ">
            <lable className="font-medium capitalize text-lg">Image Url</lable>
            <input
              value={imageUrl}
              onChange={(e) =>
                dispatch({ type: "imageUrl", payload: e.target.value })
              }
              className="outline-[#ccc] border-1 rounded-sm px-1 py-2 border-[#ccc]"
              placeholder="http://imagelink.com"
            ></input>
          </div>
          <div className="flex flex-col ">
            <lable className="font-medium capitalize text-lg">
              Instructions
            </lable>
            <input
              onChange={(e) =>
                dispatch({ type: "instructions", payload: e.target.value })
              }
              className="outline-[#ccc] border-1 rounded-sm px-1 py-2 border-[#ccc]"
              placeholder="step 1; step 2 ;step 3"
            ></input>
          </div>
          {/* ingredients */}
          <div className="flex flex-col ">
            <lable className="font-medium capitalize text-lg mb-1">
              Ingredients <span>{`(${ingredients.length})`}</span>
            </lable>

            {/* ingredits container */}
            {ingredients.length > 0 && (
              <div className="w-[100%] p-1.5 mb-0.5 max-h-20 overflow-y-scroll flex  flex-wrap gap-2 bg-[#f7f7f7] border-1 rounded-md  border-[#ccc]">
                {ingredients.map((ing) => (
                  <IngredientTag
                    onUpdateIng={handleUpdateIng}
                    ingredients={ingredients}
                    ing={ing}
                  />
                ))}
              </div>
            )}

            <div className="flex gap-1 items-center">
              <div className="flex flex-col gap-1">
                <lable className="font-light text-sm ">Ingredient</lable>
                <input
                  value={currentIng}
                  onChange={(e) => setCurrentIng(e.target.value)}
                  className="outline-[#ccc] text-sm max-w-fit border-1 rounded-sm px-1 py-2 border-[#ccc]"
                  placeholder="Sugar"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <lable className="font-light text-sm ">Quantity</lable>
                <input
                  value={currentQaunt}
                  onChange={(e) => setCurrentQuant(e.target.value)}
                  className="outline-[#ccc] text-sm max-w-fit border-1 rounded-sm px-1 py-2 border-[#ccc]"
                  placeholder="2 Spoon"
                ></input>
              </div>

              <button
                onClick={(e) => handleAddIng(e)}
                className="mt-5 ml-auto  drop-shadow-md text-center transition ease-in font-light text-md  text-white bg-primary border-1 border-primary h-[40px] px-2 rounded-md hover:bg-white cursor-pointer hover:text-primary w-fit "
              >
                Add
              </button>
            </div>
          </div>
          {/* ingredients end */}
          <div className="flex flex-col ">
            <lable className="font-medium capitalize text-lg">
              Cooking Time
            </lable>
            <input
              value={cookingTime}
              onChange={(e) =>
                dispatch({ type: "cookingTime", payload: e.target.value })
              }
              className="outline-[#ccc] border-1 rounded-sm px-1 py-2 border-[#ccc]"
              placeholder="15 minutes"
            ></input>
          </div>
          <div className="flex flex-col ">
            <lable className="font-medium capitalize text-lg">category</lable>
            <select
              onChange={(e) =>
                dispatch({ type: "category", payload: e.target.value })
              }
              value={category}
              className="outline-[#ccc] border-1 rounded-sm px-1 py-2 border-[#ccc]"
              placeholder="15 minutes"
            >
              <option>Veg</option>
              <option>Meat-based</option>
              <option>Desert</option>
              <option>Dairy</option>
            </select>
          </div>
          <button
            onClick={(e) => handleAddRecipe(e)}
            className=" ml-auto  drop-shadow-md text-center transition ease-in font-light text-lg  text-white bg-primary border-1 border-primary px-5 py-1 rounded-[100px] hover:bg-white cursor-pointer hover:text-primary w-fit "
          >
            Add
          </button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddRecipe;
