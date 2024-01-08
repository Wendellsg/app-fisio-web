"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import { useUserData } from "../../../hooks/useUserData";

export const AlreadyLoggedCard = () => {
  const { logout } = useAuth();
  const { userData } = useUserData();
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px">
      <Avatar className="w-40 h-40">
        <AvatarImage src={userData?.image} />
      </Avatar>
      <p className="mt-4">Você está logado(a) como</p>
      <p className="text-lg font-bold">{userData?.name}</p>

      <div className="flex my-8 gap-4">
        <Button
          variant={"outline"}
          type="button"
          className="w-36"
          onClick={logout}
        >
          Sair
        </Button>
        <Button className="w-36" type="submit">
          <Link
            href="/dashboard"
            passHref
            className="text-black w-full h-full flex items-center justify-center"
          >
            Continuar
          </Link>
        </Button>
      </div>
    </div>
  );
};
