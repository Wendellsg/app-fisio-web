"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Skeleton } from "./skeleton";

export function ProfileMenu() {
  const { userData, isLoading } = useUserData();
  const profileRoute = userData?.role === "patient" ? "/meu-perfil" : "/perfil";

  const { logout } = useAuth();

  if (isLoading) {
    return <Skeleton className="md:w-20 md:h-20 rounded-full outline-accent" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-20 h-20">
          <AvatarImage src={userData?.image} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={profileRoute}>Perfil</Link>
        </DropdownMenuItem>
        {userData?.role === "professional" && (
          <DropdownMenuItem>
            <Link href={"/assinatura"}>Assinatura</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
