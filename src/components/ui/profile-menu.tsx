"use client";

import { useUserData } from "@/hooks/useUserData";
import { AvatarFallback, AvatarImage, Avatar } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function ProfileMenu() {
  const { userData } = useUserData();

  const {logout} = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="md:w-20 md:h-20">
          <AvatarImage src={userData?.image} />
          <AvatarFallback>
            {useUserData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/perfil"}>Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <Link href={"/assinatura"}>Assinatura</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
