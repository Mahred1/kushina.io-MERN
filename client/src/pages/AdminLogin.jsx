import { Link } from "react-router-dom"

function AdminLogin() {
    return (
        <main className="flex flex-col justify-center items-center bg-[url(background.jpg)]   bg-cover bg-center min-w-screen min-h-screen">
      <div className=" bg-[rgba(0,0,0,0.4)] fixed top-0 left-0  min-w-screen min-h-screen"></div>

      <div className="relative z-1 bg-white flex flex-col px-[50px] py-[80px] rounded-[21px] ">
        <img width={310} height={198} src="../logo-2.svg"></img>
        <form className="flex flex-col justify-center items-center">
          <input
          autoComplete="username"
            className="w-[101%] bg-[#F1F1F1] p-[15px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="username"
            type="text"
          />
          <input
          autoComplete="current-password"
            className="w-[100%] bg-[#F1F1F1] p-[15px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="password"
            type="password"
          />
          <button
            className="w-[80%] border-1  text-center transition ease-in font-light text-xl  text-white bg-primary mt-8 px-7 py-3 rounded-[10px] hover:bg-white cursor-pointer hover:text-primary hover:border-primary drop-shadow-md">
            Login
          </button>
          <Link className="text-center font-lex text-[#464646] hover:underline mt-3.5" to={"/signup"}>don't have an account?</Link>
        </form>
      </div>
    </main>
    )
}

export default AdminLogin
