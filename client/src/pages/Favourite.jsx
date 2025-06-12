import Card from "../components/Card";
import Nav from "../components/Nav";
import { useRecipe } from "../contexts/RecipesContext";
import { motion } from "framer-motion";

function Favourite() {
  const { userFavourite, searchResult, search, isLoading } = useRecipe();

  const LoadingAnimation = () => {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const searchedList = searchResult.map((recipe) => recipe.name);
  const favSearch = userFavourite.filter((recipe) =>
    searchedList.includes(recipe.name)
  );
  console.log(favSearch);

  return (
    <div>
      <Nav />
      <header className="font-lex font-extrabold w-[80%] m-auto mt-25 text-[28px]">
        <div className="absolute bg-primary w-[155px] top-[205px] left-[245px] h-[5.5px]"></div>
        Your Favourites
      </header>
      <section
        className={`${
          favSearch.length === 0 && search !== ""
            ? `flex justify-center mt-30`
            : `grid grid-cols-4 justify-start justify-self-start gap-x-10 gap-y-14 mt-10 w-[80%] m-auto ${
                favSearch.length !== 0 && `mt-20`
              }`
        }`}
      >
        {isLoading ? (
          <LoadingAnimation />
        ) : search === "" ? (
          userFavourite.map((fav) => <Card key={fav.id} recipe={fav} />)
        ) : !favSearch.length ? (
          <div className="text-center text-2xl text-[#444]">
            Can't find a recipe with this name
          </div>
        ) : (
          favSearch.map((recipe) => {
            return <Card key={recipe.id} recipe={recipe} />;
          })
        )}
      </section>
    </div>
  );
}

export default Favourite;
