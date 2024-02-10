import { Role } from "@/types";
import { cookies } from "next/headers";

export function getSessionRole() {
  const cookieStore = cookies();
  return cookieStore.get("role")?.value as Role;
}
