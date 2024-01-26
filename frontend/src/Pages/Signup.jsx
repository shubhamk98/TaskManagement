import { useState } from "react";
import signup from "../Assets/signup.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const Signup = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(username);
  console.log(password);

  const register = async (e) => {
    e.preventDefault();
    console.log("link", API_BASE_URL);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.message);
      }

      navigator("/login");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed");
    }
  };

  return (
    <>
      <form method="POST" onSubmit={register} className="flex flex-col">
        <div className="min-w-screen min-h-screen flex items-center justify-center px-8 sm:px-16">
          <div className="bg-white text-gray-500 rounded-3xl w-full overflow-hidden">
            <div className="md:flex w-full">
              <div className="hidden md:flex justify-center items-center m-auto w-1/2">
                <img
                  src={signup}
                  alt="image"
                  className="rounded-lg bg-contain h-[500px]"
                />
              </div>

              <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <Link to={"/"}>
                  <p className="text-4xl font-bold text-pink-500">StreamLine</p>
                </Link>                
                <div className="mt-5">
                  <h1 className="text-2xl text-blackishGreen font-bold mt-8">
                    Signup
                  </h1>
                  <p className="text-sm mb-5">
                    Enter your information to Signup
                  </p>
                </div>
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label className="text-xs font-semibold px-1">
                        User Name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input
                          type="text"
                          className="w-full  -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-pink-500"
                          placeholder="johnsmith"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                      <label className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-pink-500"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button
                        type="submit"
                        className="block w-full text-white bg-pink-500 hover:bg-pink-400 focus:border-blue-200 hover:text-white rounded-lg px-3 py-3 font-semibold"
                      >
                        Signup
                      </button>
                      <p className="text-sm mt-2 cursor-pointer text-pink-500 font-medium">
                        <Link to="/login">
                          <p>Already have an account? Login here.</p>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
