import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebese/config";

export const AuthContext = createContext();

// responsible for updating state based on action type and return new state
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// components that are wrappend by this function will be provided by state and dispach functions
export const AuthContextProvider = ({ children }) => {
  //state and dispatch are from useReducer  // stateUpdate function and default state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    // it listen if there is change in authenication status
    // also because it is in useEffect if will fire on app first render
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
