import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth.guard";
import { getInitialRoteByRole } from "@/lib/utils";
import Link from "next/link";

export const AlreadyLoggedCard = () => {
  const session = getSession();
  const href = getInitialRoteByRole(session?.roles);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-10px">
      <Avatar className="w-40 h-40">
        <AvatarImage src={session?.image} />
        <AvatarFallback>
          {session?.name?.split(" ")[0][0]}
          {session?.name?.split(" ")[1][0]}
        </AvatarFallback>
      </Avatar>
      <p className="mt-4">Você está logado(a) como</p>
      <p className="text-lg font-bold">{session?.name}</p>

      <div className="flex my-8 gap-4">
        <Button variant={"outline"} type="button" className="w-36">
          <a href="/api/auth/signout">Sair</a>
        </Button>
        <Button className="w-36" type="submit">
          <Link
            href={href}
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
