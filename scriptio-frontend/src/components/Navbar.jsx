import { IoLogOut } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BrandLogo from "../assets/BrandLogo.svg";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Navbar = ({ setToken }) => {
  const isHomePage = location.pathname === "/";

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logout successful. Redirecting you to Login page...");
    navigate("/");
  };

  const isTokenAvailable = localStorage.getItem("token") !== null;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full bg-[#0e1419] p-4 shadow-md md:px-10">
      <nav className="mx-auto flex max-w-250 items-center justify-between gap-2">
        <Link
          className="nav-link flex items-center gap-1 border-none text-2xl outline-none sm:gap-2"
          to="/"
        >
          <img
            src={BrandLogo}
            alt="brand logo"
            className="max-w-40 sm:max-w-60"
          />
        </Link>
        <div className="ml-auto flex items-center gap-2 sm:gap-6" id="links">
          {isTokenAvailable ? (
            <div className="group btn relative text-2xl text-white hover:scale-110">
              <IoLogOut onClick={handleLogout} />
              <span className="absolute top-1 left-10 hidden animate-bounce rounded bg-gray-800 px-2 py-1 text-sm text-white shadow-lg group-hover:flex">
                Logout
              </span>
            </div>
          ) : (
            isHomePage && (
              <Link className="nav-link btn btn-primary" to={"./login"}>
                Login
              </Link>
            )
          )}
        </div>
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Navbar;
