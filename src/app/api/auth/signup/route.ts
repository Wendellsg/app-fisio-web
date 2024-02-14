import { HttpStatusCode } from "@/lib/http";
import { AuthService } from "../../../../services/auth.service";

const authService = new AuthService();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const response = await authService.signUp({ email, password, name });

  //TODO - Implementar envio de email de confirmação

  if (response instanceof Response) {
    return response;
  }

  return Response.json(response, { status: HttpStatusCode.OK });
}
