import { Link } from "react-router-dom";
import Button from "../components/Button";

function Homepage() {
  return (
    <main className="flex flex-col justify-center items-center bg-[url(background.jpg)]   bg-cover bg-center min-w-screen min-h-screen ">
      <div className=" bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-[]  min-w-screen min-h-screen"></div>
      <header className="relative z-2 flex flex-col justify-center items-center m-20">
        <img width={330} height={198} src="logo.svg"></img>
        <h1 className="text-white text-4xl mt-[15px] font-extrabold font-lex">
          All delicious <span className="text-primary">recipes</span> right here
        </h1>
      <div className="flex gap-8 mt-[40px]">
        <Link to={"/login"}><Button>Login</Button></Link>
        <Link to={"/signup"}><Button>Sign up</Button></Link>
        
      </div>
      </header>
    </main>
  );
}

export default Homepage;
