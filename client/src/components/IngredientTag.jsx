function IngredientTag({ ing, onUpdateIng, ingredients }) {

  function handleUpdate(id) {
    const newIngs = ingredients.filter((ing) => ing.id !== id);
    onUpdateIng(newIngs);
  }
  return (
    <div className="bg-[#e5e5e5] py-1 px-3 rounded-xl flex gap-2 items-center">
      <span>
        {" "}
        {`${
          ing.name?.charAt(0).toUpperCase() + ing.name?.slice(1).toLowerCase()
        } | ${ing.quantity}`}
      </span>
      <img
      width={14.5}
      src="close.svg"
        onClick={() => handleUpdate(ing.id)}
        className=" cursor-pointer "
      >
       
      </img>
    </div>
  );
}

export default IngredientTag;
