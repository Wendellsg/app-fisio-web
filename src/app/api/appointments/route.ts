import { canActivate, getSession } from "@/lib/auth.guard";
import prisma from "@/lib/prisma";
import { UserRoleEnum } from "@prisma/client";

export async function POST(req: Request) {
  const checkRole = await canActivate([UserRoleEnum.professional]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  const session = getSession();

  const professional = await prisma.professional.findUnique({
    where: {
      userId: session?.id,
    },
  });

  if (!professional) {
    return Response.json("Professional not found", { status: 404 });
  }

  const body = await req.json();

  const comment = await prisma.appointment.create({
    data: {
      startDate: body.startDate,
      endDate: body.endDate,
      patientId: body.patientId,
      professionalId: professional.id,
      status: body.status,
    },
  });

  return Response.json(comment, { status: 201 });
}
