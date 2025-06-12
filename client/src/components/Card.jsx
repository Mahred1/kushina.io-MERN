import { memo, useState } from "react";
import { Link, UNSAFE_FetchersContext } from "react-router-dom";
import { useRecipe } from "../contexts/RecipesContext";
import { motion } from "framer-motion";

const Card = memo(function Card({ recipe }) {
  const { userFavouriteList, favourite, updateFav } = useRecipe();
  const [isOver, setIsOver] = useState(false);

  async function handleUpdateFav() {
    if (userFavouriteList.includes(recipe.id)) {
      const newFav = favourite.filter((fav) => fav.id !== recipe.id);

      const res = await fetch(
        `http://127.0.0.1:8000/recipebook/favorites/${recipe.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `JWT ${localStorage.getItem("user")}`,
          },
        }
      );
      if (!res.ok) {
        console.log(await res.json());
      } else {
        updateFav(newFav);
      }
    } else {
      const newFav = [...favourite, recipe];
      const res = await fetch("http://127.0.0.1:8000/recipebook/favorites/", {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("user")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: recipe.id }),
      });

      if (!res.ok) {
        console.log(await res.json());
      } else {
        updateFav(newFav);
      }
    }
  }
  //301*187
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="animate-pop drop-shadow-xl w-[280px]"
    >
      <div className="w-[280px] h-[187px] overflow-hidden bg-black rounded-t-[20px]">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full object-cover object-center"
          src={`${recipe.imageUrl}`}
          alt="food"
        />
      </div>
      <div className="bg-white rounded-b-[20px]">
        <p className="font-bold ml-3 pt-2 text-[13px]">{recipe.name}</p>
        <p className="mt-0.5 ml-3 font-bold text-primary text-[18px]">
          {recipe.ingredients.length}
          <span className="font-normal text-[#a6a6a6] text-[16px] ">
            {" "}
            ingredient
          </span>
        </p>
        <div className="flex justify-between w-[90%] m-auto items-center pb-4 px-1 py-2">
          <motion.div
            onClick={handleUpdateFav}
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
            whileTap={{ scale: 0.8 }}
            animate={{ scale: isOver ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isOver ? (
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="cursor-pointer hover:fill-[#ccc]"
                src="love-red.svg"
                alt="heart"
              />
            ) : (
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="cursor-pointer hover:fill-[#ccc]"
                src={`${
                  userFavouriteList.includes(recipe.id)
                    ? `love-red.svg`
                    : "love.svg"
                }`}
                alt="heart"
              />
            )}
          </motion.div>

          <Link to={`/recipes/${recipe.id}`}>
            <button className="drop-shadow-md text-center mt-0.5 transition ease-in font-light text-md  text-white bg-primary border-1 border-primary px-3 py-1 rounded-[100px] hover:bg-white cursor-pointer hover:text-primary">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
});
export default Card;
