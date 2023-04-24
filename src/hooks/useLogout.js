import { useState, useEffect } from "react";
import { projectAuth } from "../firebese/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      // firebase method
      await projectAuth.signOut();

      // dispatch logout action user will become null
      // we set user null inside AuthContext
      dispatch({ type: "LOGOUT" });

      // update state
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCanceled) {
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
