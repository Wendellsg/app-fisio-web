import { canActivate } from "@/lib/auth.guard";
import { RequestService } from "@/services/request.service";
import { UserRoleEnum } from "@prisma/client";

export async function POST(req: Request) {
  const checkRole = await canActivate([UserRoleEnum.professional]);
  if (checkRole instanceof Response || checkRole === false) {
    return checkRole;
  }
  const requestService = new RequestService();

  const { patientId } = await req.json();
  return requestService.createRequest({ patientId });
}

export async function GET() {
  const requestService = new RequestService();

  const response = await requestService.getProfessionalRequests();

  if (response instanceof Response) return response;

  return Response.json(response);
}
