import { HttpStatusCode } from "@/lib/http";
import { UsersService } from "@/services/users.service";

export async function GET(req: Request) {
  const usersService = new UsersService();
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  if (!email) {
    return Response.json(
      { message: "Email não enviado" },
      { status: HttpStatusCode.BAD_REQUEST }
    );
  }

  const user = await usersService.findByEmail(email);

  if (!user) {
    return Response.json(
      {
        message: "Usuário não encontrado",
      },
      {
        status: HttpStatusCode.NOT_FOUND,
      }
    );
  }

  return Response.json(user, { status: HttpStatusCode.OK });
}
