import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function PacienteAvatar({
  index = 0,
  image,
  name,
  url = "",
  direction = "column",
}: {
  index?: number;
  id: string;
  image?: string;
  name: string;
  url?: string;
  direction?: "row" | "column";
}) {
  return (
    <Link href={url} passHref>
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <div
          className={`flex scale-in-center items-center justify-center gap-4 max-w-fit`}
          style={{ animationDelay: `${index}0ms`, flexDirection: direction }}
        >
          <div
            className={`ScalableButton h-20 w-20 min-w-20 min-h-20 border-accent border-2 rounded-full flex items-center justify-center`}
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
    </Link>
  );
}

export function PatientAvatarSkeleton() {
  return (
    <div className="w-32 min-w-32 items-center justify-center">
      <Skeleton className="rounded-full border-4 w-20 h-20 border-gray-50" />
      <Skeleton className="w-20 h-4 mt-2" />
    </div>
  );
}
