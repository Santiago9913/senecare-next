import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { PhoneNumberMask } from "@/app/_utils/formatters/cellPhoneFormatter";
import {
  Disability,
  HealthInsurancePolicy,
  HealthServiceProvider,
  UniversityLink,
  UniversityUnit,
} from "@/app/_utils/interfaces/common";
import { CreatePatientFormProps } from "@/app/_utils/interfaces/forms";
import {
  getDisabilities,
  getHealthInsurancePolicy,
  getHealthServiceProviders,
  getUniversityLink,
  getUniversityUnit,
} from "@/app/_utils/queries/createPatient";

export function OtherInfoForm({
  register,
  formState,
  control,
  watch,
}: CreatePatientFormProps) {
  const [isHealthServiceProvidersOpen, setIsHealthServiceProvidersOpen] =
    useState(false);
  const [isHealthInsurancePolicyOpen, setIsHealthInsurancePolicyOpen] =
    useState(false);
  const [isUniversityLinkOpen, setIsUniversityLinkOpen] = useState(false);
  const [isUniversityUnitOpen, setIsUniversityUnitOpen] = useState(false);
  const [isDisabilityOpen, setIsDisabilityOpen] = useState(false);

  const healthServiceProvidersQuery = useQuery({
    queryKey: ["healthServiceProviders"],
    queryFn: getHealthServiceProviders,
    enabled: isHealthServiceProvidersOpen,
  });

  const healthInsurancePolicyQuery = useQuery({
    queryKey: ["healthInsurancePolicy"],
    queryFn: getHealthInsurancePolicy,
    enabled: isHealthInsurancePolicyOpen,
  });

  const universityLinkQuery = useQuery({
    queryKey: ["universityLink"],
    queryFn: getUniversityLink,
    enabled: isUniversityLinkOpen,
  });

  const universityUnitQuery = useQuery({
    queryKey: ["universityUnit"],
    queryFn: getUniversityUnit,
    enabled: isUniversityUnitOpen,
  });

  const disabilityQuery = useQuery({
    queryKey: ["disability"],
    queryFn: getDisabilities,
    enabled: isDisabilityOpen,
  });

  const emergencyRelationships = ["Familiar", "Pareja", "Amigo", "Otro"];
  const healthRegimes = [
    "Contributivo",
    "Subsidiado",
    "Especial",
    "Extranjero",
  ];
  const additionalHealthServiceTypes = [
    "Póliza",
    "Seguro intermacional",
    "Plan complementario",
    "Prepagada",
    "Otra",
    "Ninguno",
  ];

  const loadingHealthServiceProviders =
    healthServiceProvidersQuery.status === "pending";

  const loadingHealthInsurancePolicy =
    healthInsurancePolicyQuery.status === "pending";

  const loadingUniversityUnit = universityUnitQuery.status === "pending";

  const healthServiceProviders: readonly HealthServiceProvider[] =
    healthServiceProvidersQuery.status === "success"
      ? healthServiceProvidersQuery.data
      : [];

  const healthInsurancePolicy: readonly HealthInsurancePolicy[] =
    healthInsurancePolicyQuery.status === "success"
      ? healthInsurancePolicyQuery.data
      : [];

  const universityUnits: readonly UniversityUnit[] =
    universityUnitQuery.status === "success" ? universityUnitQuery.data : [];

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h5">Datos de contacto de emergencia</Typography>
        <div className="grid grid-cols-3 gap-4 p-4">
          <TextField
            required
            label="Nombre completo"
            {...register("emergencyContactName")}
            error={!!formState.errors.emergencyContactName}
            helperText={formState.errors.emergencyContactName?.message}
          />
          <TextField
            required
            label="Celular"
            {...register("emergencyContactPhoneNumber")}
            error={!!formState.errors.emergencyContactPhoneNumber}
            helperText={formState.errors.emergencyContactPhoneNumber?.message}
            InputProps={{
              inputComponent: PhoneNumberMask as any,
            }}
          />
          <FormControl required>
            <InputLabel>Estado civil</InputLabel>
            <Select
              defaultValue=""
              label="Prentesco"
              {...register("emergencyRelationship")}
            >
              {emergencyRelationships.map((relation: string, idx: number) => (
                <MenuItem key={idx + 1} value={relation}>
                  {relation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <Typography variant="h5">Datos entidad de salud</Typography>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Controller
            control={control}
            name="healthServiceProvider"
            render={({ field }) => (
              <Autocomplete
                clearOnEscape
                clearOnBlur
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onOpen={() => setIsHealthServiceProvidersOpen((_) => true)}
                options={
                  healthServiceProvidersQuery.status === "success"
                    ? healthServiceProviders
                    : []
                }
                getOptionLabel={(option: string | HealthServiceProvider) => {
                  if (typeof option === "string") return option;
                  return option.name;
                }}
                loading={loadingHealthServiceProviders}
                renderInput={(parms) => (
                  <TextField {...parms} label="EPS" required />
                )}
              />
            )}
          />
          <div className="flex space-x-4">
            <div className="flex-1">
              <FormControl fullWidth required>
                <InputLabel>Régimen de salud</InputLabel>
                <Select
                  defaultValue=""
                  label="Régimen de salud"
                  {...register("healthRegime")}
                >
                  {healthRegimes.map((regime: string, idx: number) => (
                    <MenuItem key={idx + 1} value={regime}>
                      {regime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex-1">
              <FormControl fullWidth required>
                <InputLabel>Tipo de entidad de salud adicional</InputLabel>
                <Select
                  required
                  defaultValue=""
                  label="Tipo de entidad de salud adicional"
                  {...register("additionalHealthServiceType")}
                >
                  {additionalHealthServiceTypes.map(
                    (regime: string, idx: number) => (
                      <MenuItem key={idx + 1} value={regime}>
                        {regime}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
          <Controller
            control={control}
            name="healthInsurancePolicy"
            render={({ field }) => (
              <Autocomplete
                clearOnEscape
                clearOnBlur
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onOpen={() => setIsHealthInsurancePolicyOpen((_) => true)}
                onClose={() => setIsHealthInsurancePolicyOpen((_) => false)}
                options={
                  healthInsurancePolicyQuery.status === "success"
                    ? healthInsurancePolicy
                    : []
                }
                getOptionLabel={(option: string | HealthInsurancePolicy) => {
                  if (typeof option === "string") return option;
                  return option.name;
                }}
                loading={loadingHealthInsurancePolicy}
                renderInput={(parms) => (
                  <TextField {...parms} label="Entidad de salud adicional" />
                )}
              />
            )}
          />
        </div>
      </div>
      <div>
        <Typography variant="h5">Vínculo uniandes</Typography>
        <div className="grid grid-cols-3 gap-4 p-4">
          <FormControl required>
            <InputLabel>Vínculo con la universidad</InputLabel>
            <Select
              defaultValue=""
              label="Vínculo con la universidad"
              {...register("universityLink")}
              onOpen={() => {
                setIsUniversityLinkOpen((_) => true);
              }}
              onClose={() => {
                setIsUniversityLinkOpen((_) => false);
              }}
            >
              {universityLinkQuery.status === "pending" ? (
                <div></div>
              ) : universityLinkQuery.status === "error" ? (
                <div>Error: {universityLinkQuery.error.message}</div>
              ) : (
                universityLinkQuery.data.map((link: UniversityLink) => (
                  <MenuItem key={link.id} value={link.name}>
                    {link.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Controller
            control={control}
            name="universityUnit"
            render={({ field }) => (
              <Autocomplete
                clearOnEscape
                clearOnBlur
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onOpen={() => setIsUniversityUnitOpen((_) => true)}
                onClose={() => setIsUniversityUnitOpen((_) => false)}
                options={
                  universityUnitQuery.status === "success"
                    ? universityUnits
                    : []
                }
                getOptionLabel={(option: string | UniversityUnit) => {
                  if (typeof option === "string") return option;
                  return option.name;
                }}
                loading={loadingUniversityUnit}
                renderInput={(parms) => (
                  <TextField {...parms} label="Facultad/Dirección/Unidad" />
                )}
              />
            )}
          />
        </div>
      </div>
      <div>
        <Typography variant="h5">Discapacidades</Typography>
        <div className="grid grid-cols-3 gap-4 p-4">
          <FormControl required>
            <InputLabel>Discapacidad</InputLabel>
            <Select
              defaultValue=""
              label="Discapacidad"
              {...register("disability")}
              onOpen={() => {
                setIsDisabilityOpen((_) => true);
              }}
              onClose={() => {
                setIsDisabilityOpen((_) => false);
              }}
            >
              {disabilityQuery.status === "pending" ? (
                <div></div>
              ) : disabilityQuery.status === "error" ? (
                <div>Error: {disabilityQuery.error.message}</div>
              ) : (
                disabilityQuery.data.map((disability: Disability) => (
                  <MenuItem key={disability.id} value={disability.nombre}>
                    {disability.readableName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
