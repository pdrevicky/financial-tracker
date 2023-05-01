import { createContext, ReactNode, useEffect, useReducer } from "react";
import { projectAuth } from "../firebese/config";
import React from "react";
import firebese from "firebase";
import { AuthActionTypeEnum } from "../types/types";

type AuthContextType = {
  user: payloadType;
  authIsReady: boolean;
  dispatch: (value: AuthAction) => void;
};

const MyAuthContext = {
  user: null,
  authIsReady: false,
  dispatch: () => {},
};

export const AuthContext = createContext<AuthContextType>(MyAuthContext);

type payloadType = firebese.User | boolean | null;

type AuthAction = {
  type: AuthActionTypeEnum;
  payload: payloadType;
};

interface AuthState {
  user: payloadType;
  authIsReady: boolean;
}

// responsible for updating state based on action type and return new state
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypeEnum.LOGIN:
      return { ...state, user: action.payload };
    case AuthActionTypeEnum.LOGOUT:
      return { ...state, user: null };
    case AuthActionTypeEnum.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
  // any props that come into the component
}

// components that are wrappend by this function will be provided by state and dispach functions
export const AuthContextProvider = ({ children }: Props) => {
  //state and dispatch are from useReducer  // stateUpdate function and default state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    // it listen if there is change in authenication status
    // also because it is in useEffect if will fire on app first render
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: AuthActionTypeEnum.AUTH_IS_READY, payload: user });
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
