import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import UnprotectedRoute from "./pages/UnprotectedRoute";

function App() {
  const { isLoading: isLoadingUser } = useAuthContext();

  if (isLoadingUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<UnprotectedRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
