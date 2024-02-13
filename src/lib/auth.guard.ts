import { Session } from "@/types";
import { env } from "@/utils/env";
import { UserRoleEnum } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";

export class AuthGuard {
  async canActivate(
    response: NextApiResponse,
    requiredRoles?: UserRoleEnum[]
  ): Promise<boolean> {
    const token = extractTokenFromCookies();
    if (!token) {
      throw response.status(401).json({ message: "Unauthorized" });
    }
    try {
      const payload = await jwt.verifyAsync(token, {
        secret: env.JWT_SECRET,
      });

      if (!requiredRoles) {
        return true;
      }

      if (requiredRoles) {
        return payload.roles.some((role) => requiredRoles.includes(role));
      }

      return false;
    } catch {
      throw response.status(401).json({ message: "Unauthorized" });
    }
  }
}

function extractTokenFromCookies(): string | undefined {
  const cookieStore = cookies();
  const _token = cookieStore.get("fsio@token")?.value;
  const [type, token] = _token?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}

export function getSession(): Session | null {
  const token = extractTokenFromCookies();

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch {
    return null;
  }
}
