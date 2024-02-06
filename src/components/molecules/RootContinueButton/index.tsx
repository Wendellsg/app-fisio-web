"use client";

import { Button } from "@/components/ui/button";
import { getInitialRoteByRole } from "@/lib/utils";
import { Role } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RootContinueButton() {
  const [href, setHref] = useState("/login");

  useEffect(() => {
    const role = localStorage.getItem("fisio@role") || "";

    const redirectUrl = getInitialRoteByRole(role as Role);

    setHref(redirectUrl);
  }, []);

  return (
    <Link href={href} passHref>
      <Button>Continuar</Button>
    </Link>
  );
}
