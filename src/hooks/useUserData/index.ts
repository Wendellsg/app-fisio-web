import { atom, useAtom } from "jotai";
import { useApi } from "../Apis";
import { toast } from "react-toastify";

import { User } from "../../types/user";

export const userDataAtom = atom<User | null>({} as User);
export const useUserData = () => {
  const [userData, setUserData] = useAtom(userDataAtom);
  const { fisioApi } = useApi();

  const getUserdata = async () => {
    try {
      const meResponse = await fisioApi.get("/auth/me");
      setUserData(meResponse?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Sessão expirada, faça login novamente");
        return;
      }
      toast.error(error.response?.data?.message);
    }
  };

  const updateUserProfileImage = async (url: string) => {
    try {
      const response = await fisioApi.patch("/users/image", {
        profileImage: url,
      });
      getUserdata();
      toast.success("Imagem de perfil atualizada com sucesso");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const upateUserProfileData = async (data: User) => {
    try {
      console.log(data);
      await fisioApi.patch("/users", data);
      getUserdata();
      toast.success("Dados atualizados com sucesso");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return {
    userData,
    getUserdata,
    updateUserProfileImage,
    upateUserProfileData,
    setUserData,
  };
};
