function Button({ children }) {
  return (
    <button
      className={`drop-shadow-md text-center transition ease-in font-light text-xl  text-white bg-primary px-7 py-3 rounded-[100px] hover:bg-white cursor-pointer hover:text-primary`}
    >
      {children}
    </button>
  );
}

export default Button;
