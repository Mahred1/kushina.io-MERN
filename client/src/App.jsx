import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Home from "./pages/Home";
import { RecipesContext } from "./contexts/RecipesContext";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Admin from "./pages/Admin";
import Favourite from "./pages/Favourite";
import AdminLogin from "./pages/AdminLogin";
import { AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import RoleBasedRoute from "./pages/RoleBasedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <AuthContext>
        <RecipesContext>
        <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound/>}></Route>
              <Route index element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home/:id"
                element={
                  <ProtectedRoute>
                    <Recipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes"
                element={
                  <ProtectedRoute>
                    <Recipes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes/:id"
                element={
                  <ProtectedRoute>
                    <Recipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favourite"
                element={
                  <ProtectedRoute>
                    <Favourite />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <RoleBasedRoute>
                      {" "}
                      <Admin />
                    </RoleBasedRoute>
                  </ProtectedRoute>
                }
              >
                <Route path="login" element={<AdminLogin />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </RecipesContext>
      </AuthContext>
    </div>
  );
}

export default App;
