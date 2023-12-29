"use client";

import { Skeleton } from "../ui/skeleton";

export default function PacienteAvatar({
  index = 0,
  id,
  image,
  name,
  onClick,
  direction = "column",
}: {
  index?: number;
  id: string;
  image?: string;
  name: string;
  onClick?: () => void;
  direction?: "row" | "column";
}) {
  return (
    <div className="w-32 min-w-32 items-center justify-center">
      <div
        className={`flex scale-in-center items-center justify-center gap-4 max-w-fit`}
        style={{ animationDelay: `${index}0ms`, flexDirection: direction }}
      >
        <div
          className={`ScalableButton h-20 w-20 min-w-20 min-h-20 border-accent border-2 rounded-full flex items-center justify-center`}
          onClick={onClick}
        >
          <img
            alt="imagem de perfil"
            width={76}
            className="rounded-full border-white border-4 w-full h-full object-covers"
            src={
              image
                ? image
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
          />
        </div>
        <p className="font-bold text-center overflow-hidden text-ellipsis whitespace-nowrap min-w-16 max-w-32">
          {name}
        </p>
      </div>
    </div>
  );
}

export function PatientAvatarSkeleton() {
  return (
    <div className="w-32 min-w-32 items-center justify-center">

      <Skeleton className="rounded-full border-white border-4 w-20 h-20 border-gray-50" />
      <Skeleton className="w-20 h-4 mt-2" />
    </div>
  );
}
