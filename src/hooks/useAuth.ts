import { isAuthenticatedAtom, userAtom } from "./states";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { useApi } from "./Apis";
import { useRouter } from "next/router";
import { User } from "../types/user";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userData, setUserData] = useAtom(userAtom);

  const router = useRouter();

  const { fisioApi, setToken } = useApi();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await fisioApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("fisio@token", data);
      setToken(data);
      setIsAuthenticated(true);
      router.push("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("fisio@token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const getUserdata = async () => {
    try {
      const meResponse = await fisioApi.get("/auth/me");

      setUserData(meResponse.data as User);
    } catch (error) {
      toast.error(error.response.data.message);
      logout();
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    getUserdata,
    userData,
  };
};
