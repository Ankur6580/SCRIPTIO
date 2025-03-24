import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <Navbar setToken={setToken} />
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Home />}
          />
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard setToken={setToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
