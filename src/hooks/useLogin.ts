import { useState, useEffect } from "react";
import { projectAuth } from "../firebese/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError("");
    setIsPending(true);

    //sign the user out
    try {
      // firebase method
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update local state
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

  return { login, error, isPending };
};