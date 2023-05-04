import { userAtom } from "./states";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useAuth = () => {
  const [userToken, setUserToken] = useAtom(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("fisi@userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return {
    userToken,
    setUserToken,
  };
};
