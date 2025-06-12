import { Navigate } from "react-router-dom";
import UnAuthorized from "./UnAuthorized";
import { jwtDecode } from "jwt-decode";

function RoleBasedRoute({ children }) {
  
  return (
    <div>
      { jwtDecode(localStorage.getItem("user")).role==='admin'? children : <UnAuthorized />}
    </div>
  );
}

export default RoleBasedRoute;
