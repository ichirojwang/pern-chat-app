import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import "./index.css";
import SignUp from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import SocketContextProvider from "./context/SocketContext";
import AppLayout from "./pages/AppLayout";
import NoConversationSelected from "./features/conversations/NoConversationSelected";
import MessageContainer from "./features/messages/MessageContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <div className="p-4 h-screen flex items-center justify-center">
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="/messages" />} />
                  <Route path="/messages" element={<NoConversationSelected />} />
                  <Route path="/messages/:id" element={<MessageContainer />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </SocketContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
