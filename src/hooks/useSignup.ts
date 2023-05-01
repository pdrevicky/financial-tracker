import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { AuthActionTypeEnum } from "../types/types";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // email, password and displayName are firebase authentication
  // properties that this in this case authentication allow us to use,
  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError("");
    setIsPending(true);

    try {
      // signup user and automatically login user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await res.user!.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: AuthActionTypeEnum.LOGIN, payload: res.user });

      if (!isCanceled) {
        setIsPending(false);
        setError("");
      }
    } catch (err) {
      if (!isCanceled && err instanceof Error) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { error, isPending, signup };
};
