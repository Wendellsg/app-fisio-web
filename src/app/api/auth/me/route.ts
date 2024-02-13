import { getSession } from "@/lib/auth.guard";
import { AuthService } from "../../../../services/auth.service";

const authService = new AuthService();

export async function GET() {
  const session = getSession();

  if (!session) return Response.json("Unauthorized", { status: 401 });

  const response = await authService.me(session?.id);

  return Response.json(response, { status: response.status });
}
