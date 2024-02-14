import { Session } from "@/types";
import { env } from "@/utils/env";
import { UserRoleEnum } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function canActivate(
  requiredRoles?: UserRoleEnum[]
): Promise<boolean | Response> {
  const token = extractTokenFromCookies();

  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  try {
    const session = jwt.verify(token, env.JWT_SECRET) as Session;

    if (!requiredRoles) {
      return true;
    }

    let rolePermitted = true;

    if (requiredRoles) {
      const haveRole = requiredRoles.some((role) =>
        session.roles.includes(role)
      );

      rolePermitted = haveRole;
    }

    if (!rolePermitted) {
      return Response.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    return rolePermitted;
  } catch {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      }
    );
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
    return jwt.verify(token, env.JWT_SECRET) as Session;
  } catch {
    return null;
  }
}
