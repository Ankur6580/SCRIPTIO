import React, { useCallback, useEffect, useState } from "react";

import Home from "./Home";

const Dashboard = ({ setToken }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);

  const fetchDashboard = useCallback(
    async (abortController) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setToken(null);
        return;
      }

      try {
        const response = await fetch(`${backendURL}/api/auth/dashboard`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: abortController.signal,
        });
        const data = await response.json();

        if (response.status !== 200) {
          localStorage.removeItem("token");
          setToken(null);
          return;
        }

        setUser({
          id: data.user.id,
          name: data.user.name,
          token: token,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          setToken(null);
        }
      }
    },
    [setToken],
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (!user) {
      fetchDashboard(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [user, fetchDashboard]);

  if (!user) return <h1 className="text-center text-3xl">Loading...</h1>;

  return (
    <>
      <h1 className="mx-auto mt-30 flex w-fit items-center gap-1 text-3xl">
        Welcome,&nbsp;
        <span className="gradient-animation bg-gradient-to-r from-(--warning) via-(--success) to-(--warning) bg-clip-text font-bold text-transparent mix-blend-difference">
          {user.name}
        </span>
      </h1>

      <br />
      <Home user={user} />
    </>
  );
};

export default Dashboard;
