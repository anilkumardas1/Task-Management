import { Navigate } from "react-router-dom";
import { isloggedin } from "../../service/localstroageService";

export default function ProtectedRoute({ children }) {
    const isLoggedIn = isloggedin(); // ✅ checking login


    return isLoggedIn ? children : <Navigate to="/" />;
}
