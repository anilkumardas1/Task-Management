import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AuthForm from "./pages/public/AuthForm";
import Dashboard from "./pages/private/Dashboard";


function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<AuthForm />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
