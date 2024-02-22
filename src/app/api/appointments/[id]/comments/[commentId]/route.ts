import { canActivate } from "@/lib/auth.guard";
import prisma from "@/lib/prisma";
import { UserRoleEnum } from "@prisma/client";
export async function PUT(req: Request, params: { commentId: string }) {
  const checkRole = await canActivate([UserRoleEnum.professional]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  const body = await req.json();

  const comment = await prisma.appointmentComment.update({
    where: {
      id: params.commentId,
    },
    data: {
      comment: body.comment,
    },
  });

  return Response.json(comment, { status: 200 });
}

export async function DELETE(req: Request, params: { commentId: string }) {
  const checkRole = await canActivate([UserRoleEnum.professional]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  await prisma.appointmentComment.delete({
    where: {
      id: params.commentId,
    },
  });

  return Response.json({ status: 200 });
}
