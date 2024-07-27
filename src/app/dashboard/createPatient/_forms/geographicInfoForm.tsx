import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  City,
  Country,
  Department,
  Locality,
} from "@/app/_utils/interfaces/common";
import { CreatePatientFormProps } from "@/app/_utils/interfaces/forms";
import {
  getCities,
  getCountries,
  getDepartments,
  getLocalities,
} from "@/app/_utils/queries/createPatient";

export function GeographicInfoForm({
  register,
  formState,
  control,
  watch,
  resetField,
}: CreatePatientFormProps) {
  const [
    countryOfResidence,
    departmentOfResidence,
    cityOfResidence,
    locality,
    countryOfBirth,
    departmentOfBirth,
    cityOfBirth,
  ] = watch!([
    "countryOfResidence",
    "departmentOfResidence",
    "cityOfResidence",
    "locality",
    "countryOfBirth",
    "departmentOfBirth",
    "cityOfBirth",
  ]);

  const countryOfResidenceRegister = register("countryOfResidence");
  const departmentOfResidenceRegister = register("departmentOfResidence");
  const countryOfBirthRegister = register("countryOfBirth");
  const departmentOfBirthRegister = register("departmentOfBirth");

  const [isCountryOfResidenceOpened, setIsCountryOfResidenceOpened] =
    useState(false);

  const [isDepartmentOfResidenceOpened, setIsDepartmentOfResidenceOpened] =
    useState(false);

  const shouldEnableColombianOptions = countryOfResidence === "Colombia";
  const shouldEnableCities =
    shouldEnableColombianOptions && !!departmentOfResidence;

  const shouldEnableColombianOptionsBirth = countryOfBirth === "Colombia";
  const shouldEnableCitiesBirth =
    shouldEnableColombianOptionsBirth && !!departmentOfBirth;

  const shouldEnableLocalities = Number(cityOfResidence) === 149;

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    enabled: isCountryOfResidenceOpened,
  });

  const departmentQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    enabled:
      isDepartmentOfResidenceOpened &&
      (shouldEnableColombianOptions || shouldEnableColombianOptionsBirth),
  });

  const citiesQuery = useQuery({
    queryKey: ["cities", departmentOfResidence],
    queryFn: () => {
      return getCities(departmentOfResidence);
    },
    enabled: shouldEnableCities,
  });

  const citiesOfBirthQuery = useQuery({
    queryKey: ["citiesBirth", departmentOfBirth],
    queryFn: () => {
      return getCities(departmentOfBirth);
    },
    enabled: shouldEnableCitiesBirth,
  });

  const loacalitiesQuery = useQuery({
    queryKey: ["localities"],
    queryFn: getLocalities,
    enabled: shouldEnableLocalities,
  });

  const territorialZones = ["Urbana", "Rural"];
  const economicalStatus = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <Typography variant="h5">Información geográfica</Typography>
      <div className="grid grid-cols-4 gap-4 p-4">
        <FormControl required>
          <InputLabel>País de residencia</InputLabel>
          <Select
            defaultValue={""}
            {...countryOfResidenceRegister}
            label="País de residencia"
            onOpen={() => {
              setIsCountryOfResidenceOpened((_) => true);
            }}
            onClose={() => {
              setIsCountryOfResidenceOpened((_) => false);
            }}
            onChange={(event: SelectChangeEvent) => {
              countryOfResidenceRegister.onChange(event);
              const country = event.target.value;
              if (country !== "Colombia" && departmentOfResidence) {
                resetField!("departmentOfResidence");
              }
            }}
            error={!!formState.errors.countryOfResidence}
          >
            {countryQuery.status === "pending" ? (
              <div></div>
            ) : countryQuery.status === "error" ? (
              <div>Error: {countryQuery.error.message}</div>
            ) : (
              countryQuery.data.map((country: Country) => (
                <MenuItem key={country.id} value={country.name}>
                  {country.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl disabled={!shouldEnableColombianOptions}>
          <InputLabel>Departamento de residencia</InputLabel>
          <Select
            defaultValue={""}
            value={departmentOfResidence ? departmentOfResidence : ""}
            error={!!formState.errors.departmentOfResidence}
            label="Departamento de residencia"
            {...register("departmentOfResidence")}
            onOpen={() => {
              setIsDepartmentOfResidenceOpened((_) => true);
            }}
            onClose={() => {
              setIsDepartmentOfResidenceOpened((_) => false);
            }}
            onChange={(event: SelectChangeEvent) => {
              departmentOfResidenceRegister.onChange(event);
              if (
                departmentOfResidence &&
                departmentOfResidence !== event.target.value &&
                cityOfResidence
              ) {
                resetField!("cityOfResidence");
              }
            }}
          >
            {departmentQuery.status === "pending" ? (
              <div></div>
            ) : departmentQuery.status === "error" ? (
              <div>Error: {departmentQuery.error.message}</div>
            ) : (
              departmentQuery.data.map((department: Department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl disabled={!shouldEnableCities}>
          <InputLabel>Municipio o ciudad de residencia</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.cityOfResidence}
            value={cityOfResidence ? cityOfResidence : ""}
            label="Municipio o ciudad de residencia"
            {...register("cityOfResidence")}
          >
            {citiesQuery.status === "pending" ? (
              <div></div>
            ) : citiesQuery.status === "error" ? (
              <div>Error: {citiesQuery.error.message}</div>
            ) : (
              citiesQuery.data.map((city: City) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel>Zona territorial de residencia</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.territorialZone}
            label="Zona territorial de residencia"
            {...register("territorialZone")}
          >
            {territorialZones.map((zone: string, idx: number) => (
              <MenuItem key={idx + 1} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Dirección de residencia"
          {...register("addressOfResidence")}
          required
          error={!!formState.errors.addressOfResidence}
          helperText={formState.errors.addressOfResidence?.message}
        />
        <TextField
          label="Barrio de residencia"
          {...register("neighborhood")}
          required
          error={!!formState.errors.neighborhood}
          helperText={formState.errors.neighborhood?.message}
        />
        <FormControl disabled={!shouldEnableLocalities}>
          <InputLabel>Localidad</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.locality}
            value={locality ? locality : ""}
            label="Localidad"
            {...register("locality")}
          >
            {loacalitiesQuery.status === "pending" ? (
              <div></div>
            ) : loacalitiesQuery.status === "error" ? (
              <div>Error: {loacalitiesQuery.error.message}</div>
            ) : (
              loacalitiesQuery.data.map((city: Locality) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.locality_name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Estrato socioeconómico</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.economicalStatus}
            label="Estrato socioeconómico"
            {...register("economicalStatus")}
          >
            {economicalStatus.map((economicalStatus: number) => (
              <MenuItem key={economicalStatus} value={economicalStatus}>
                {economicalStatus}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel>País de nacimiento</InputLabel>
          <Select
            defaultValue={""}
            {...countryOfBirthRegister}
            error={!!formState.errors.countryOfBirth}
            label="País de nacimiento"
            onOpen={() => {
              setIsCountryOfResidenceOpened((_) => true);
            }}
            onClose={() => {
              setIsCountryOfResidenceOpened((_) => false);
            }}
            onChange={(event: SelectChangeEvent) => {
              countryOfBirthRegister.onChange(event);
              const country = event.target.value;
              if (country !== "Colombia" && departmentOfBirth) {
                resetField!("departmentOfBirth");
              }
            }}
          >
            {countryQuery.status === "pending" ? (
              <div></div>
            ) : countryQuery.status === "error" ? (
              <div>Error: {countryQuery.error.message}</div>
            ) : (
              countryQuery.data.map((country: Country) => (
                <MenuItem key={country.id} value={country.name}>
                  {country.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl disabled={!shouldEnableColombianOptionsBirth}>
          <InputLabel>Departamento de nacimiento</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.departmentOfBirth}
            value={departmentOfBirth ? departmentOfBirth : ""}
            label="Departamento de nacimiento"
            {...register("departmentOfBirth")}
            onOpen={() => {
              setIsDepartmentOfResidenceOpened((_) => true);
            }}
            onClose={() => {
              setIsDepartmentOfResidenceOpened((_) => false);
            }}
            onChange={(event: SelectChangeEvent) => {
              departmentOfBirthRegister.onChange(event);
              if (
                departmentOfBirth &&
                departmentOfBirth !== event.target.value &&
                cityOfBirth
              ) {
                resetField!("cityOfBirth");
              }
            }}
          >
            {departmentQuery.status === "pending" ? (
              <div></div>
            ) : departmentQuery.status === "error" ? (
              <div>Error: {departmentQuery.error.message}</div>
            ) : (
              departmentQuery.data.map((department: Department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl disabled={!shouldEnableCitiesBirth}>
          <InputLabel>Municipio o ciudad de nacimiento</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.cityOfBirth}
            value={cityOfBirth ? cityOfBirth : ""}
            label="Municipio o ciudad de residencia"
            {...register("cityOfBirth")}
          >
            {citiesOfBirthQuery.status === "pending" ? (
              <div></div>
            ) : citiesOfBirthQuery.status === "error" ? (
              <div>Error: {citiesOfBirthQuery.error.message}</div>
            ) : (
              citiesOfBirthQuery.data.map((city: City) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel>Zona territorial de nacimiento</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.territorialZoneOfBirth}
            label="Zona territorial de nacimiento"
            {...register("territorialZoneOfBirth")}
          >
            {territorialZones.map((zone: string, idx: number) => (
              <MenuItem key={idx + 1} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
