"use client";
import Loading from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { Input, InputBox, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/hooks/useUserData";
import { SignUpData, signUpDataSchema } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AlreadyLoggedCard } from "../AlreadyLoggedCard";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpDataSchema),
  });

  const { userData } = useUserData();
  const router = useRouter();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const handleSignUp = async (signUpData: SignUpData) => {
    setIsSigningUp(true);

    if (signUpData.password !== signUpData.passwordConfirmation) {
      setSignUpError("As senhas não coincidem");
      setIsSigningUp(false);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-up`, {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });
      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      if (error.response) {
        setSignUpError(error.response.data.message);
      } else {
        setSignUpError("Erro ao se conectar com o servidor");
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  if (userData?.id) {
    return <AlreadyLoggedCard />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px md:min-w-80 md:w-96"
    >
      <p className="font-bold">Cadastre-se</p>
      <InputBox>
        <Label htmlFor="name">Nome</Label>

        <Input
          placeholder="Seu nome"
          type="text"
          name="name"
          id="name"
          register={register}
        />

        {errors?.email?.message && (
          <InputError>{errors?.email?.message}</InputError>
        )}
      </InputBox>

      <InputBox>
        <Label htmlFor="email">E-mail</Label>

        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          id="email"
          register={register}
        />

        {errors?.email?.message && (
          <InputError>{errors?.email?.message}</InputError>
        )}
      </InputBox>

      <InputBox>
        <Label htmlFor="password">Senha</Label>

        <Input
          placeholder="Senha"
          type="text"
          name="password"
          id="password"
          register={register}
        />

        {errors?.password?.message && (
          <InputError>{errors?.password?.message}</InputError>
        )}
      </InputBox>

      <InputBox>
        <Label htmlFor="password-confirmation">Confirmação de Senha</Label>

        <Input
          placeholder="Senha"
          type="text"
          name="passwordConfirmation"
          register={register}
          id="password-confirmation"
        />

        {errors?.passwordConfirmation?.message && (
          <InputError>{errors?.passwordConfirmation?.message}</InputError>
        )}
      </InputBox>

      {signUpError && <InputError>{signUpError}</InputError>}

      <Button
        type="submit"
        className="w-full text-black font-bold"
        disabled={isSigningUp}
      >
        {isSigningUp ? <Loading color="white" size={15} /> : "Criar conta"}
      </Button>

      <div className="flex flex-col items-center justify-center gap-1 border-t border-gray-300 pt-4">
        <p className="text-xs">Já tem uma conta?</p>

        <Link href="/login" passHref>
          <p className="text-md font-bold cursor-pointer">Faça login</p>
        </Link>
      </div>
    </form>
  );
}
