import { canActivate } from "@/lib/auth.guard";
import { AppointmentsService } from "@/services/appointments.service";
import { UserRoleEnum } from "@prisma/client";
import { endOfMonth, startOfMonth, startOfToday } from "date-fns";

export async function GET(req: Request) {
  const checkRole = await canActivate([UserRoleEnum.professional]);

  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }

  const searchParams = new URL(req.url).searchParams;
  const date = searchParams.get("date");

  if (!date) return Response.json("Date not found", { status: 400 });

  const appointmentsService = new AppointmentsService();
  const today = startOfToday();
  const searchDate = date?.replace(/-/g, "/");
  const parsedDate = searchDate ? new Date(searchDate) : today;
  const startDate = startOfMonth(parsedDate);
  const endDate = endOfMonth(parsedDate);

  const professionalAppointments = await appointmentsService.findByProfessional(
    {
      startDate,
      endDate,
    }
  );

  if (professionalAppointments instanceof Response) {
    return professionalAppointments;
  }

  return Response.json(professionalAppointments, { status: 200 });
}
