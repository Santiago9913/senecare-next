"use client";

import { Button } from "@mui/material";
import LogInIconButton from "./loginIconButton";
import { signIn } from "next-auth/react";

export default function LogInButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      // onClick={() => signIn()}
      onClick={onClick}
      variant="contained"
      fullWidth
      startIcon={<LogInIconButton />}
    >
      {label}
    </Button>
  );
}
