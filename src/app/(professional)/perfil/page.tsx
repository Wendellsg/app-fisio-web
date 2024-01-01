"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { RiEditBoxFill, RiMapPinLine } from "react-icons/ri";

export default function Profile() {
  const { userData } = useUserData();

  return (
    <div className="flex gap-4 w-full p-4 items-start justify-between">
      <div className="w-1/2 h-full flex flex-col">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">{userData?.name}</h2>
          <div className="flex items-center gap-4 my-4 flex-wrap">
            <h2 className="text-md md:text-xl p-2 bg-primary rounded-md  font-bold">
              {userData?.profession}
            </h2>
            <p className="font-bold">{userData?.professionalLicense}</p>
          </div>
          <p className="font-bold">{userData?.introduction}</p>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-4">
            <BsWhatsapp className="text-md md:text-lg" />

            <p className="font-bold">{userData?.phone}</p>
          </div>
          <div className="flex items-center gap-4">
            <BsEnvelope className="text-md md:text-lg" />

            <p className="font-bold">{userData?.email}</p>
          </div>

          <div className="flex items-center gap-4">
            <RiMapPinLine className="text-md md:text-lg" />

            <p className="font-bold">
              {userData?.address}, {userData?.addressNumber} -{" "}
              {userData?.addressComplement}, {userData?.addressNeighborhood} -{" "}
              {userData?.addressCity} - {userData?.addressState}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Avatar className="w-32 h-32">
          <AvatarImage src={userData?.image} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
        <Button type="submit">
          <Link href="/perfil/editar" passHref>
            Editar Perfil
          </Link>
        </Button>
      </div>
    </div>
  );
}
