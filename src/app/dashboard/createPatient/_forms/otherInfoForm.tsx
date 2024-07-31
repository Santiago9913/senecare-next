import {
  Autocomplete,
  FormControl,
  FormHelperText,
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
  resetField,
}: CreatePatientFormProps) {
  const [
    additionalHealthServiceTypeWatch,
    disabilityWatch,
    healthInsurancePolicyWatch,
  ] = watch([
    "additional_health_service_type",
    "disability",
    "fk_health_insurance_policy",
  ]);

  const additionalHealthServiceTypeRegister = register(
    "additional_health_service_type"
  );

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

  const healthInsurancePolicyValue = healthInsurancePolicyQuery.data?.find(
    (e) => e.id === healthInsurancePolicyWatch
  );

  const disableAdditionalHealthServiceType =
    additionalHealthServiceTypeWatch === "Ninguno" ||
    additionalHealthServiceTypeWatch === undefined;

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
            {...register("emergency_contact_name")}
            error={!!formState.errors.emergency_contact_name}
            helperText={formState.errors.emergency_contact_name?.message}
          />
          <TextField
            required
            label="Celular"
            {...register("emergency_contact_number")}
            error={!!formState.errors.emergency_contact_number}
            helperText={formState.errors.emergency_contact_number?.message}
            InputProps={{
              inputComponent: PhoneNumberMask as any,
            }}
          />
          <FormControl required>
            <InputLabel>Parentesco</InputLabel>
            <Select
              defaultValue=""
              label="Prentesco"
              {...register("emergency_contact_relationship")}
            >
              {emergencyRelationships.map((relation: string, idx: number) => (
                <MenuItem key={idx + 1} value={relation}>
                  {relation}
                </MenuItem>
              ))}
            </Select>
            {formState.errors.emergency_contact_relationship && (
              <FormHelperText error>
                {formState.errors.emergency_contact_relationship.message}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
      <div>
        <Typography variant="h5">Datos entidad de salud</Typography>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Controller
            control={control}
            name="fk_health_services_provider"
            render={({ field }) => (
              <Autocomplete
                clearOnEscape
                clearOnBlur
                autoHighlight
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, value) => {
                  field.onChange(value?.id);
                }}
                onOpen={() => setIsHealthServiceProvidersOpen((_) => true)}
                options={healthServiceProviders}
                getOptionLabel={(option: string | HealthServiceProvider) => {
                  if (typeof option === "string") return option;
                  return option.name;
                }}
                loading={loadingHealthServiceProviders}
                renderInput={(parms) => (
                  <TextField
                    {...parms}
                    label="EPS"
                    required
                    error={!!formState.errors.fk_health_services_provider}
                    helperText={
                      formState.errors.fk_health_services_provider?.message
                    }
                  />
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
                  {...register("regimen")}
                >
                  {healthRegimes.map((regime: string, idx: number) => (
                    <MenuItem key={idx + 1} value={regime}>
                      {regime}
                    </MenuItem>
                  ))}
                </Select>
                {formState.errors.regimen && (
                  <FormHelperText error>
                    {formState.errors.regimen.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flex-1">
              <FormControl fullWidth required>
                <InputLabel>Tipo de entidad de salud adicional</InputLabel>
                <Select
                  required
                  value={additionalHealthServiceTypeWatch ?? ""}
                  label="Tipo de entidad de salud adicional"
                  {...additionalHealthServiceTypeRegister}
                  onOpen={() => {
                    return true;
                  }}
                  onClose={() => {
                    return false;
                  }}
                  onChange={(e) => {
                    additionalHealthServiceTypeRegister.onChange(e);
                    console.log(e.target.value);
                    if (e.target.value === "Ninguno") {
                      resetField("fk_health_insurance_policy");
                    }
                  }}
                >
                  {additionalHealthServiceTypes.map(
                    (regime: string, idx: number) => (
                      <MenuItem key={idx + 1} value={regime}>
                        {regime}
                      </MenuItem>
                    )
                  )}
                </Select>
                {formState.errors.additional_health_service_type && (
                  <FormHelperText error>
                    {formState.errors.additional_health_service_type.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
          </div>
          <Controller
            disabled={disableAdditionalHealthServiceType}
            control={control}
            name="fk_health_insurance_policy"
            render={({ field }) => (
              <Autocomplete
                disabled={disableAdditionalHealthServiceType}
                clearOnEscape
                clearOnBlur
                isOptionEqualToValue={(option, value) => {
                  if (typeof value === "string") return false;
                  if (typeof option === "string") return false;
                  return option.name === value.name;
                }}
                onChange={(_, value) => {
                  field.onChange(value?.id);
                }}
                onOpen={() => setIsHealthInsurancePolicyOpen((_) => true)}
                onClose={() => setIsHealthInsurancePolicyOpen((_) => false)}
                options={healthInsurancePolicy}
                getOptionLabel={(option: string | HealthInsurancePolicy) => {
                  if (typeof option === "string") return option;
                  return option.name;
                }}
                loading={loadingHealthInsurancePolicy}
                renderInput={(parms) => (
                  <TextField
                    {...parms}
                    label="Entidad de salud adicional"
                    error={!!formState.errors.fk_health_insurance_policy}
                    helperText={
                      formState.errors.fk_health_insurance_policy?.message
                    }
                  />
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
              {...register("fk_university_link")}
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
                  <MenuItem key={link.id} value={link.id}>
                    {link.name}
                  </MenuItem>
                ))
              )}
            </Select>
            {formState.errors.fk_university_link && (
              <FormHelperText error>
                {formState.errors.fk_university_link.message}
              </FormHelperText>
            )}
          </FormControl>
          <Controller
            control={control}
            name="fk_unit"
            render={({ field }) => (
              <Autocomplete
                clearOnEscape
                clearOnBlur
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onChange={(_, value) => field.onChange(value?.id)}
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
                  <TextField
                    {...parms}
                    label="Facultad/Dirección/Unidad"
                    error={!!formState.errors.fk_unit}
                    helperText={formState.errors.fk_unit?.message}
                  />
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
              label="Discapacidad"
              value={disabilityWatch ?? ""}
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
            {formState.errors.disability && (
              <FormHelperText error>
                {formState.errors.disability.message}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
    </div>
  );
}
