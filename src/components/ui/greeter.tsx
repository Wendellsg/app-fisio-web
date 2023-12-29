"use client";

import { useUserData } from "@/hooks/useUserData";
import { Skeleton } from "./skeleton";

export const Greeter = () => {
  const { userData, isLoading } = useUserData();

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <>
          <Skeleton className="h-6 w-[50px] " />
          <Skeleton className="h-6 w-[250px] mt-2" />
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Olá,</h2>
          <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
            {userData?.name}
          </h2>
        </>
      )}
    </div>
  );
};
