import { Button } from "@/components/ui/button";
import { getInitialRoteByRole } from "@/lib/utils";
import Link from "next/link";
import { getSession } from "../lib/auth.guard";

export default function RootPage() {
  const session = getSession();

  const href = getInitialRoteByRole(session?.roles);

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-center bg-cover bg-[url('https://fisio-app.s3.sa-east-1.amazonaws.com/images/pexels-ryutaro-tsukata-5473186.jpg')]">
      <div className=" bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center gap-4 p-8">
        <img src={"/assets/exercicios.png"} alt="exercicios" />
        {session && (
          <h1 className="font-bold">
            Olá, <b>{session.name}</b>!
          </h1>
        )}
        <h1 className="font-bold">
          Bem-vindo ao <b>Fsio.app!</b>
        </h1>
        <Link href={href} passHref>
          <Button>Continuar</Button>
        </Link>
      </div>
    </main>
  );
}
