import { canActivate, getSession } from "@/lib/auth.guard";
import { HttpStatusCode } from "@/lib/http";
import { UsersService } from "@/services/users.service";
import { UserRoleEnum } from "@prisma/client";

export async function POST(req: Request) {
  const checkToken = await canActivate([UserRoleEnum.professional]);

  if (checkToken instanceof Response || checkToken === false) {
    return checkToken;
  }

  const usersService = new UsersService();
  const body = await req.json();

  if (!body) {
    return Response.json(
      { message: "Corpo da requisição não enviado" },
      { status: HttpStatusCode.BAD_REQUEST }
    );
  }

  const session = getSession();

  const professional = await prisma?.professional.findUnique({
    where: {
      userId: session?.id,
    },
  });

  if (professional instanceof Response) {
    return checkToken;
  }

  if (!professional) {
    return Response.json(
      { message: "Profissional não encontrado" },
      {
        status: HttpStatusCode.UNAUTHORIZED,
      }
    );
  }

  const user = await usersService.create({
    name: body.name,
    email: body.email,
  });

  if (user instanceof Response) {
    return user;
  }

  const addResponse = await usersService.addPatient(professional.id, user.id);

  return Response.json(addResponse, { status: HttpStatusCode.OK });
}

export async function GET() {
  canActivate([UserRoleEnum.admin]);

  const usersService = new UsersService();

  const users = await usersService.getPatients();

  return Response.json(users, { status: HttpStatusCode.OK });
}
