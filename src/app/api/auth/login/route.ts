import { AuthService } from "../../../../services/auth.service";

const authService = new AuthService();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  return await authService.login(email, password);
}
