"use client";

import { getInitialRoteByRole } from "@/lib/utils";
import { queryClient } from "@/providers";
import { Role } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
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
      localStorage.setItem("fisio@token", data.token);

      ///set cookie fisio@role as data user role

      document.cookie = `fisio@role=${data.user.role}`;

      const redirectUrl = getInitialRoteByRole(data.user.role as Role);

      window.location.href = redirectUrl;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLogging(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("fisio@token");
    document.cookie =
      "fisio@role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    queryClient.clear();

    router.push("/");
  };

  return {
    login,
    logout,
    register,
    handleSubmit: handleSubmit(login),
    loginErrors: errors,
    isLogging,
  };
};
