import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  responseData: null,
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [responseData, setResponseData] = useState(null);
  
  const validateToken = async () => {
    try {
      const response = await fetch( `${API_BASE_URL}/api/auth/validate-token`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setIsLoggedIn(false);
        throw new Error("Token invalid");
      }
      const responseData = await response.json();
      setIsLoggedIn(true);
      setResponseData(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    validateToken();
  }, [isLoggedIn]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , responseData}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
