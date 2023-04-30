import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// helper hook
export const useAuthContext = () => {
  // context will be object from AuthContext- AuthContext.Provider value={{ ...state, dispatch }}
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside an AuthContextProvider");
  }

  // state and dispatch function
  return context;
};
