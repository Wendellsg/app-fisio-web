"use client";

import { useUserData } from "@/hooks/useUserData";
import { Skeleton } from "./skeleton";

export const Greeter = () => {
  const { userData, isLoading } = useUserData();

  if (isLoading)
    return (
      <div className="flex flex-col">
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Olá,</h2>
      </div>
    );

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Olá,</h2>

      {isLoading ? (
        <Skeleton className="h-4 w-[250px]" />
      ) : (
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
          {userData?.name}
        </h2>
      )}
    </div>
  );
};
