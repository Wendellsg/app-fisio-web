import { canActivate } from "@/lib/auth.guard";
import prisma from "@/lib/prisma";
import { UserRoleEnum } from "@prisma/client";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const checkRole = await canActivate([UserRoleEnum.professional]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  console.log(params.id);

  const allcomments = await prisma.appointmentComment.findMany({
    where: {},
  });

  console.log(allcomments);

  const comments = await prisma.appointmentComment.findMany({
    where: {
      appointmentId: params.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(comments, { status: 200 });
}

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const checkRole = await canActivate([UserRoleEnum.professional]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  const body = await req.json();

  const comment = await prisma.appointment.update({
    where: {
      id: params.id,
    },
    data: {
      comments: {
        create: {
          comment: body.comment,
        },
      },
    },
  });

  return Response.json(comment, { status: 201 });
}
