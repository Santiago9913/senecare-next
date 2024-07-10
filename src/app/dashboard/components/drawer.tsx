"use client";

import { Button, Link, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";

interface DrawerProps {
  profileName: string;
  role: string;
}

export default function SenecareDrawer({ profileName, role }: DrawerProps) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="w-64 h-screen bg-white">
      <div className="flex flex-col h-full">
        <div className="">
          <Typography variant="h6" textAlign="center" mt={2}>
            {profileName}
          </Typography>
        </div>
        <div className="grow pt-12">
          <div className="flex flex-col">
            <Link
              component={"button"}
              variant="subtitle2"
              textAlign="center"
              underline={pathName === "/dashboard" ? "always" : "none"}
              onClick={() => {
                router.replace("/dashboard");
              }}
            >
              Buscar Pacientes
            </Link>
            <Link
              component={"button"}
              variant="subtitle2"
              textAlign="center"
              underline={pathName.includes("createPatient") ? "always" : "none"}
              onClick={() => {
                router.replace("/dashboard/createPatient");
              }}
            >
              Crear Paciente
            </Link>
          </div>
        </div>
        <div className="place-content-end pb-4 px-4">
          <Button
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
            variant="contained"
            fullWidth
            color={"error"}
            sx={{
              px: 4,
            }}
          >
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
}
