import { AuthService } from "../../../../services/auth.service";

const authService = new AuthService();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const response = await authService.signUp({ email, password, name });

  return Response.json(response, { status: response.status });
}
