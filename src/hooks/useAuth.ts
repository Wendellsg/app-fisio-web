import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { queryClient } from "../functions/queryClient";

const createLoginSchema = z.object({
  email: z
    .string()
    .email("Formato de email inválido")
    .nonempty("Campo obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .nonempty("Campo obrigatório"),
});

type LoginData = z.infer<typeof createLoginSchema>;

export const useAuth = () => {
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(createLoginSchema),
  });
  const router = useRouter();

  const login = async ({ email, password }) => {
    setIsLogging(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("fisio@token", data);
     window.location.href = "/home";
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLogging(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("fisio@token");
    queryClient.clear();
    router.push("/");
  };

  return {
    login,
    logout,
    register,
    handleSubmit,
    loginErrors: errors,
    isLogging,
  };
};
