import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { ReactNode, useState } from "react";

interface SuccessAlertProps {
  message: string;
  open: boolean;
  severity: "success" | "error" | "info" | "warning";
  autoHideDuration?: number;
  onClose?: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

export function AlertSnackbar({
  message,
  open,
  severity,
  autoHideDuration = 2000,
  onClose,
}: SuccessAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
