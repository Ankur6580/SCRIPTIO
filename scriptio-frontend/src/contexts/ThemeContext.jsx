import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("theme");
  const [themeMode, setThemeMode] = useState(savedTheme);

  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };
  const funkyTheme = () => {
    setThemeMode("funky");
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.remove("light", "dark", "funky");
    html.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{ themeMode, darkTheme, lightTheme, funkyTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
