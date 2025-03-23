import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { validateCredentials } from "../helpers/validator";

const Register = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validation = validateCredentials(email, password);

    if (validation.isValid) {
      try {
        const response = await fetch(`${backendURL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        alert("Registration succesfull. Redirecting to login page...");
        navigate("/login");
      } catch (error) {
        alert(error.message);
      }
    } else {
      const emailAlert = validation.email.alert;
      const passwordAlert = validation.password.alert;
      alert(`${emailAlert}\n${passwordAlert}`);
    }
  };

  return (
    <>
      <h1 className="relative mt-30 mb-4 text-center text-3xl">Register</h1>

      <AuthForm
        type="register"
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <button
        onClick={handleRegister}
        className="mx-auto mt-2 block rounded p-2 shadow-md"
      >
        Register
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
