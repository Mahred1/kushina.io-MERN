import { memo, useState } from "react";
import { useRecipe } from "../contexts/RecipesContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminRecipe = memo(function AdminRecipe({
  recipe,
  setCurrentRecipe,
  onSetEdit,
}) {
  const navigate = useNavigate();
  const { recipes, updateRecipes } = useRecipe();
  const [confirm, setConfirm] = useState(false);
  async function handleDelete(recipe) {
    console.log(recipe);
    const res = await fetch(
      `http://localhost:3000/recipes/delete/${recipe.id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("user")}`,
        },
      }
    );

    if (!res.ok) {
      console.log(res);
    } else {
      const updatedRecipe = recipes.filter(
        (myrecipe) => myrecipe.id !== recipe.id
      );

      updateRecipes(updatedRecipe);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[80%] m-auto mt-15 flex justify-between font-poppins"
    >
      <AnimatePresence>
        {confirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white border border-[#787878] rounded-lg w-100 h-50 fixed top-[15%] left-[26%] translate-x-[50%] translate-y-[50%]"
          >
            <p className="text-center mt-4 text-lg">Are you sure?</p>
            <p className="text-center mt-4 text-lg">Delete: {name}</p>

            <div className="flex gap-3 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(recipe)}
                className="bg-[#f91919] text-white px-5 py-2 rounded-md hover:bg-[#ff0808d3] cursor-pointer"
              >
                yes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setConfirm(false)}
                className="cursor-pointer px-3 p-2 rounded-md border border-[#acacac] text-[#858585]"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-[230px] h-[150px] rounded-lg overflow-hidden"
        >
          <img
            className="w-full h-full object-cover object-center"
            width={250}
            src={`${recipe.imageUrl}`}
            alt="food"
          />
        </motion.div>
        <div>
          <p className="font-bold">{recipe.name}</p>
          <p className="text-primary font-bold">
            {recipe.ingredients.length}{" "}
            <span className="text-[12px] font-normal text-black">
              Ingredients
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate(`/recipes/${recipe.id}`);
          }}
          className="flex select-none flex-col items-center cursor-pointer"
        >
          <img className="ml-2" width={28} src="view.svg" alt="edit" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onSetEdit((edit) => !edit);
            setCurrentRecipe(recipe);
          }}
          className="flex select-none flex-col items-center cursor-pointer"
        >
          <img className="ml-2" width={25} src="edit.svg" alt="edit" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setConfirm(!confirm)}
          className="flex select-none flex-col items-center cursor-pointer"
        >
          <img width={25} src="delete.svg" alt="delete" />
        </motion.div>
      </div>
    </motion.div>
  );
});
export default AdminRecipe;
