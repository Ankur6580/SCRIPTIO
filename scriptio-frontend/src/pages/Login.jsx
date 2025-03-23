import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { validateCredentials } from "../helpers/validator";

const Login = ({ setToken }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const validation = validateCredentials(email, "password", false);

    if (validation.isValid) {
      try {
        const response = await fetch(`${backendURL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          alert(data.message);
          navigate("/dashboard", { replace: true });
        } else {
          alert(data);
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert(validation.alert);
    }
  };

  return (
    <>
      <h1 className="relative mt-30 mb-4 text-center text-3xl">Login</h1>

      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <button
        onClick={handleLogin}
        className="mx-auto block rounded p-2 shadow-md"
      >
        Login
      </button>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link className="link" to="/register">
          Register
        </Link>
      </p>
    </>
  );
};

export default Login;
