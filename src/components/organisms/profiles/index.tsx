"use client";
import { InfoItem } from "@/components/molecules/infoItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { findAge } from "@/utils/date";
import Link from "next/link";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { FaEnvelope, FaWeight } from "react-icons/fa";
import { FaRulerVertical } from "react-icons/fa6";
import { HiCake } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiMapPin2Fill, RiMapPinLine } from "react-icons/ri";

export const PatientProfile = () => {
  const { userData } = useUserData();
  const { logout } = useAuth();

  return (
    <div className="w-full">
      <div className="w-full md:w-fit flex-col flex items-center gap-4 mt-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={userData?.image} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0]?.[0]}
            {userData?.name?.split(" ")[1]?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold ">{userData?.name}</h2>
        </div>
      </div>

      <Accordion type="single" className="w-full md:max-w-80 mt-8" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Detalhes</AccordionTrigger>
          <AccordionContent>
            <div className="w-full flex flex-col gap-4">
              <InfoItem
                icon={<HiCake size={30} />}
                text={
                  userData?.birthDate
                    ? findAge(userData?.birthDate) + " anos"
                    : "Sem idade"
                }
              />
              <InfoItem
                icon={<FaRulerVertical size={30} />}
                text={
                  userData?.height
                    ? userData?.height?.toString() + " cm"
                    : "Sem altura"
                }
              />
              <InfoItem
                icon={<FaWeight size={30} />}
                text={
                  userData?.weight
                    ? userData?.weight?.toString() + " Kg"
                    : "Sem peso"
                }
              />
              <InfoItem
                icon={<IoLogoWhatsapp size={30} />}
                text={userData?.phone || "Sem telefone"}
              />
              <InfoItem
                icon={<FaEnvelope size={30} />}
                text={userData?.email || "Sem email"}
              />

              {userData?.address && (
                <InfoItem
                  icon={<RiMapPin2Fill size={30} />}
                  iconSize="30px"
                  text={
                    userData?.address +
                    ", " +
                    userData?.addressNumber +
                    ", " +
                    userData?.addressCity +
                    " - " +
                    userData?.addressState
                  }
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="w-full flex gap-2 mt-4">
        <Button variant={"outline"} onClick={logout}>
          Sair
        </Button>

        <Button>
          <Link href="/meu-perfil/editar" passHref className="w-full">
            Editar Perfil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const ProfessionalProfile = () => {
  const { userData } = useUserData();

  return (
    <>
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
    </>
  );
};
