import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Card from "../components/Card";
import { useRecipe } from "../contexts/RecipesContext";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

function Home() {
  const { recipes, isLoading } = useRecipe();
  const { user } = useAuth();

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

  return (
    <main>
      <Nav searchBar={false} />

      <header className="font-lex font-extrabold w-[80%] m-auto mt-25 text-[28px]">
        <div className="absolute bg-primary w-[136px] top-[205px] h-[5.5px]"></div>
        Welcome to Kushina,
        <span className="text-primary"> {user?.full_name}</span>
      </header>
      <section className="w-[80%] m-auto mt-[50px] font-poppins mb-100px ">
        <div className="flex justify-between items-center font-medium">
          <p className="text-[19px] ">Popular recipes</p>
          <Link to="/recipes">
            <div className="flex">
              <p className="text-primary ">View all</p>{" "}
              <img src="right.svg"></img>{" "}
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-4 justify-start justify-self-start gap-x-10 gap-y-14 mt-5 mb-15">
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            recipes.map((recipe, index) => {
              return index < 7 && <Card key={recipe.id} recipe={recipe} />;
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
