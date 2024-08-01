import { Button, CircularProgress } from "@mui/material";

interface ButtonProps {
  text: string;
  variant?: "contained" | "outlined" | "text";
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
}

export function SenecareButton({
  text,
  variant,
  type,
  startIcon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      type={type}
      disabled={isLoading || disabled}
      startIcon={startIcon ? (isLoading ? null : startIcon) : undefined}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress size={24} /> : text}
    </Button>
  );
}
