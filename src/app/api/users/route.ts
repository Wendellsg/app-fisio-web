import { getSession } from "@/lib/auth.guard";
import { HttpStatusCode } from "@/lib/http";
import { UsersService } from "@/services/users.service";

export async function POST(req: Request) {
  const usersService = new UsersService();
  const body = await req.json();

  if (!body) {
    return Response.json(
      { message: "Corpo da requisição não enviado" },
      { status: HttpStatusCode.BAD_REQUEST }
    );
  }

  let createResponse = {
    message: "Usuário criado",
    status: HttpStatusCode.CREATED,
  };

  if (body.byProfessional) {
    const session = getSession();

    const professional = await prisma?.professional.findUnique({
      where: {
        userId: session?.id,
      },
    });

    if (!professional) {
      return Response.json(
        { message: "Profissional não encontrado" },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    createResponse = await usersService.createByDoctor(
      {
        name: body.name,
        email: body.email,
      },
      professional?.id
    );

    return Response.json(createResponse, { status: createResponse.status });
  }

  createResponse = await usersService.create(body);

  return Response.json(createResponse, { status: createResponse.status });
}
