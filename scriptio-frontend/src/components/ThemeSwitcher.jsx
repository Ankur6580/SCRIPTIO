import useTheme from "../contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { themeMode, lightTheme, darkTheme, funkyTheme } = useTheme();

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    if (selectedTheme === "funky") funkyTheme();
    else if (selectedTheme === "dark") darkTheme();
    else lightTheme();
    localStorage.removeItem("theme");
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <>
      <select
        id="themeSwitch"
        onChange={handleThemeChange}
        value={themeMode || "light"}
        className={"btn-md nav-link btn border-none bg-slate-900 outline-none"}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="funky">Neo</option>
      </select>
    </>
  );
};

export default ThemeSwitcher;
