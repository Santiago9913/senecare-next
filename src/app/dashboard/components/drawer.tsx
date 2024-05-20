import { Button, Link, Typography } from "@mui/material";

export default function SenecareDrawer({
  profileName,
  role,
}: {
  profileName: string;
  role: string;
}) {
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
              underline="hover"
            >
              Buscar Pacientes
            </Link>
            <Link
              component={"button"}
              variant="subtitle2"
              textAlign="center"
              underline="hover"
            >
              Crear Paciente
            </Link>
          </div>
        </div>
        <div className="place-content-end pb-4 px-4">
          <Button
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
