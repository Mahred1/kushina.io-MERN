import { useNavigate, useParams } from "react-router-dom";
import { useRecipe } from "../contexts/RecipesContext";
import Nav from "../components/Nav";

function Recipe() {
  const { recipes } = useRecipe();
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((recipe) => recipe.id === id);
  return (
    <main>
      <Nav src={"../logo-2.svg"} searchBar={false} />
      <div
        className="flex w-[80%] m-auto gap-2 mt-8 items-center text-primary cursor-pointer text-[20px]"
        onClick={() => navigate(-1)}
      >
        <img width={18} src={"../back.svg"}></img>
        <span>Back</span>
      </div>

      {!recipes.length ?<div>loading</div>: (
        <section className="w-[80%] m-auto mt-[25px] mb-20">
          <h1 className="font-roboto text-[35px] font-bold tracking-wider ">
            {recipe.name.toUpperCase()}
          </h1>
          <div className="w-[600px] h-[380px] mt-8 ">
            <img
              className="w-[100%] h-[100%] object-cover object-center"
              src={`../${recipe.imageUrl}`}
            />
          </div>
          <div className="flex  gap-2 font-inter mt-4 text-lg items-center">
            <img className="w-[22px]" src="../clock.svg" alt="clock" />
            <p>Ready in: {recipe.cookingTime}</p>
          </div>
          <div className="flex  gap-2 font-inter mt-2 text-lg items-center">
            <img className="w-[22px]" src="../ingredient.svg" alt="clock" />
            <p>Ingredients: {recipe.ingredients.length}</p>
          </div>

          <section className="mt-7">
            <h1 className="font-inter text-[35px] font-[700] tracking-wider ">
              INGREDIENTS
            </h1>
            <ul>
              {recipe.ingredients.map((ingr) => <li className="font-roboto font-[400] text-[22px] text-[#373737] tracking-wider ml-3">{ingr.name} - <span className="font-normal">{ingr.quantity}</span></li>)}
            </ul>
          </section>

          <section className="mt-7">
            <h1 className="font-inter text-[35px] font-[700] tracking-wider ">
              DIRECTIONS
            </h1>
            <ul>
              {recipe.instructions.map((inst,index) => <li className="font-roboto font-[300] text-[#373737] text-[22px] ml-3 tracking-wider"><span className="font-bold text-[#000]">{index+1}. </span>{inst}</li>)}
            </ul>
          </section>
        </section>
      )}
    </main>
  );
}

export default Recipe;
