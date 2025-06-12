function Category({ children, onSetSelected, selected }) {
  function handleSelected() {
    onSetSelected(children);
  }

  return (
    <div
      onClick={handleSelected}
      className={`cursor-pointer ${
        selected === children
          ? "bg-primary font-poppins w-fit px-8  py-1 rounded-4xl text-[17PX] border-1 border-primary transition-colors ease-in "
          : "w-fit  font-poppins px-8  py-1 rounded-4xl text-[17px] border-1 border-[#9A9A9A] hover:bg-primary hover:text-white hover:border-transparent transition-colors ease-in"
      }`}
    >
      <p>{children}</p>
    </div>
  );
}

export default Category;
