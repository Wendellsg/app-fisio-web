import { canActivate } from "@/lib/auth.guard";
import { HttpStatusCode } from "@/lib/http";
import { UsersService } from "@/services/users.service";
import { UserRoleEnum } from "@prisma/client";

export async function POST(req: Request) {
  const usersService = new UsersService();
  const body = await req.json();

  const checkRole = await canActivate([UserRoleEnum.admin]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  if (!body) {
    return Response.json(
      { message: "Corpo da requisição não enviado" },
      { status: HttpStatusCode.BAD_REQUEST }
    );
  }

  const createResponse = await usersService.create({
    name: body.name,
    email: body.email,
  });

  return Response.json(createResponse, { status: HttpStatusCode.OK });
}
