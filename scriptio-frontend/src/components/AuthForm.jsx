import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const AuthForm = ({
  type,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      <div className="mx-auto flex max-w-[650px] flex-col gap-2 rounded p-4">
        {type === "register" && (
          <>
            <label htmlFor="name">Name</label>
            <input
              className="border p-2"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          className="border p-2"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            className="w-full border p-2"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          {passwordVisible ? (
            <LuEye
              className="btn-sq absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-(--background)"
              onClick={() => setPasswordVisible((prev) => !prev)}
            />
          ) : (
            <LuEyeClosed
              className="btn-sq absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-(--background)"
              onClick={() => setPasswordVisible((prev) => !prev)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
