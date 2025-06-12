import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const authProvider = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminNav, setAdminNav] = useState(false);
  const [error, setError] = useState("");
  //   get user
  useEffect(
    function () {
      async function getUser() {
        const token = localStorage.getItem("user");
        const res = await fetch("http://localhost:3000/recipes", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!res.ok) {
          setUser(null);
          setAuthLoading(false);

          return;
        }
        if (token) {
          const user = jwtDecode(token);
          console.log(user);
          setUser(user);
          if (user.role === "admin") {
            setAdminNav(true);
          } else {
            setAdminNav(false);
          }
        }
        setAuthLoading(false);
      }
      getUser();
    },
    []
  );

  console.log(adminNav);

  //   logout

  function logout() {
    localStorage.removeItem("user");
  }

  //login

  async function login(username, password) {
    setAuthLoading(true);
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
      }
      console.log(error);
      // setError(await res.json());
      setAuthLoading(false);
      return false;
    }
    const data = await res.json();
    console.log(data)
    setUser(data);
    localStorage.setItem("user", data);
    setAuthLoading(false);
    if (jwtDecode(data).role === "admin") {
      setAdminNav(true);
    } else {
      setAdminNav(false);
    }
    return true;
  }
  //sign up
  async function signup(username, password, email, full_name, role) {
    setAuthLoading(true);
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        full_name,
        role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(email);
    if (!res.ok) {
      const data = await res.json();
      console.log(data)
      if (data.error) {
        setError(data.error);
      }
      // console.log(await res.json());
      setAuthLoading(false);
      return false;
    }

    setAuthLoading(false);
    return true;
  }

  return (
    <authProvider.Provider
      value={{
        user,
        authLoading,
        logout,
        login,
        signup,
        adminNav,
        error,
        setError,
      }}
    >
      {children}
    </authProvider.Provider>
  );
}
function useAuth() {
  const context = useContext(authProvider);
  return context;
}

export { AuthContext, useAuth };
