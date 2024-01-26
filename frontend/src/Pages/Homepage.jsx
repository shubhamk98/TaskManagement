import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Hero from "../Components/Hero";
import Main from "./Main";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const Homepage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handelLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="h-screen">
      <div className="h-16 flex items-center justify-between p-3 border-b-2 shadow-md bg-slate-100">
        <h1 className="ml-4 text-pink-500 font-black text-xl md:text-2xl">
          Streamline
        </h1>

        {!isLoggedIn ? (
          <div>
            <Link to={"/login"}>
              <button className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-pink-500 rounded-lg mr-4 text-white font-semibold hover:bg-pink-400">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-pink-500 rounded-lg mr-4 text-white font-semibold hover:bg-pink-400">
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <button
            className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3  bg-pink-500 rounded-lg mr-4 text-white font-semibold hover:bg-pink-400"
            onClick={handelLogout}
          >
            Logout
          </button>
        )}
      </div>

      {isLoggedIn === null ? (
        <></>
      ) : isLoggedIn ? (
        <Main />
      ) : (
        <Hero />
      )}
    </div>
  );
};

export default Homepage;
