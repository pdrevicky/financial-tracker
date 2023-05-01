import { useState, useEffect } from "react";
import { projectAuth } from "../firebese/config";
import { AuthActionTypeEnum } from "../types/types";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError("");
    setIsPending(true);

    //sign the user out
    try {
      // firebase method
      await projectAuth.signOut();

      // dispatch logout action user will become null
      // we set user null inside AuthContext
      dispatch({ type: AuthActionTypeEnum.LOGOUT, payload: null });

      // update state
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

  // This will set is cancelled true
  // Example if we try to signOut but comnonen is unmounted already
  // it will set isCanceled true and will not run state updated after
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { logout, error, isPending };
};
