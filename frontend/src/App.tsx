import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Navigate replace to="/messages" />} />
          <Route path="/messages" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={null} />
      </Routes>
    </QueryClientProvider>
  </AuthContextProvider>;
}

export default App;
