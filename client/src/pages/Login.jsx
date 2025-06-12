import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import Error from "../components/Error";
import { motion } from "framer-motion";

function Login() {
  const location = useLocation();

  useEffect(() => {
    setError("");
  }, [location]);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login, authLoading, error, setError } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (username === "") {
      setError("Username is required");
      return;
    }
    if (password === "") {
      setError("password is required");
      return;
    }
    const log = await login(username, password);
    console.log(log);
    if (log && !authLoading) navigate("/home");
  }

  const LoadingDots = () => {
    return (
      <div className="flex gap-1 items-center justify-center min-w-[80px] h-[24px]">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-white rounded-full"
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
    );
  };

  return (
    <main className="flex flex-col justify-center items-center bg-[url(background.jpg)]   bg-cover bg-center min-w-screen min-h-screen">
      <div className=" bg-[rgba(0,0,0,0.4)] fixed top-0 left-0  min-w-screen min-h-screen"></div>
      {error && <Error>{error}</Error>}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.5,
        }}
        className="relative z-1 bg-white flex flex-col px-[50px] py-[80px] rounded-[21px]"
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          width={310}
          height={198}
          src="logo-2.svg"
        />
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col justify-center items-center"
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="w-[101%] bg-[#F1F1F1] p-[15px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="username"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-[100%] bg-[#F1F1F1] p-[15px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="password"
            type="password"
          />
          <button
            onClick={(e) => handleLogin(e)}
            className="w-[80%] border-1 text-center transition ease-in font-light text-xl text-white bg-primary mt-8 px-7 py-3 rounded-[10px]  cursor-pointer  hover:border-primary drop-shadow-md"
          >
            {authLoading ? <LoadingDots /> : "Login"}
          </button>
          <Link
            className="text-center font-lex text-[#464646] hover:underline mt-3.5"
            to={"/signup"}
          >
            don't have an account?
          </Link>
        </motion.form>
      </motion.div>
    </main>
  );
}

export default Login;
