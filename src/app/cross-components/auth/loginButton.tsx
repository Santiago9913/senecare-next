"use client";

import { Button, CircularProgress } from "@mui/material";
import LogInIconButton from "./loginIconButton";

interface LogInButtonProps {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
}

export default function LogInButton({
  label,
  onClick,
  isLoading = false,
}: LogInButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      fullWidth
      disabled={isLoading}
      startIcon={isLoading ? null : <LogInIconButton />}
    >
      <div className="min-h-6">
        {isLoading ? (
          <CircularProgress size={24} sx={{ position: "absolute" }} />
        ) : (
          label
        )}
      </div>
    </Button>
  );
}
