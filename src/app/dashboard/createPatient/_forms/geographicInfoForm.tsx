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
import { useState } from "react";

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
    "fk_country_residence_habitual",
    "fk_department_of_residence",
    "town_or_city_residence",
    "fk_locality",
    "fk_country_birth",
    "fk_department_of_birth",
    "town_or_city_birth",
  ]);

  const countryOfResidenceRegister = register("fk_country_residence_habitual");
  const departmentOfResidenceRegister = register("fk_department_of_residence");
  const cityOfResidenceRegister = register("town_or_city_residence");
  const countryOfBirthRegister = register("fk_country_birth");
  const departmentOfBirthRegister = register("fk_department_of_birth");

  const [isCountryOfResidenceOpened, setIsCountryOfResidenceOpened] =
    useState(false);
  const [isCountryOfBirthOpened, setIsCountryOfBirthOpened] = useState(false);

  const [isDepartmentOfResidenceOpened, setIsDepartmentOfResidenceOpened] =
    useState(false);
  const [isDepartmentOfBirthOpened, setIsDepartmentOfBirthOpened] =
    useState(false);

  const [isCityOfResidenceOpened, setIsCityOfResidenceOpened] = useState(false);
  const [isCityOfBirthOpened, setIsCityOfBirthOpened] = useState(false);

  const shouldEnableColombianOptions = Number(countryOfResidence) === 1;
  const shouldEnableCities =
    shouldEnableColombianOptions && !!departmentOfResidence;

  const shouldEnableColombianOptionsBirth = Number(countryOfBirth) === 1;
  const shouldEnableCitiesBirth =
    shouldEnableColombianOptionsBirth && !!departmentOfBirth;

  const shouldEnableLocalities = Number(cityOfResidence) === 149;

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    enabled: isCountryOfResidenceOpened || isCountryOfBirthOpened,
  });

  const departmentQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    enabled:
      (isDepartmentOfResidenceOpened || isDepartmentOfBirthOpened) &&
      (shouldEnableColombianOptions || shouldEnableColombianOptionsBirth),
  });

  const citiesQuery = useQuery({
    queryKey: ["cities", departmentOfResidence],
    queryFn: () => {
      return getCities(departmentOfResidence!);
    },
    enabled: isCityOfResidenceOpened && shouldEnableColombianOptions,
  });

  const citiesBirthQuery = useQuery({
    queryKey: ["cities", departmentOfBirth],
    queryFn: () => {
      return getCities(departmentOfBirth!);
    },
    enabled: isCityOfBirthOpened && shouldEnableColombianOptionsBirth,
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
            value={countryOfResidence?.toString() ?? ""}
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
              if (country !== "1" && departmentOfResidence) {
                resetField!("fk_department_of_residence");
                resetField!("town_or_city_residence");
              }
            }}
            error={!!formState.errors.fk_country_residence_habitual}
          >
            {countryQuery.status === "pending" ? (
              <div></div>
            ) : countryQuery.status === "error" ? (
              <div>Error: {countryQuery.error.message}</div>
            ) : (
              countryQuery.data.map((country: Country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))
            )}
          </Select>
          {formState.errors.fk_country_residence_habitual && (
            <FormHelperText error>
              {formState.errors.fk_country_residence_habitual.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          disabled={!shouldEnableColombianOptions}
          required={shouldEnableColombianOptions}
          aria-hidden={!shouldEnableColombianOptions}
        >
          <InputLabel>Departamento de residencia</InputLabel>
          <Select
            type="number"
            value={departmentOfResidence?.toString() ?? ""}
            error={!!formState.errors.fk_department_of_residence}
            label="Departamento de residencia"
            {...departmentOfResidenceRegister}
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
                (departmentOfResidence?.toString() ?? "") !==
                  event.target.value &&
                cityOfResidence
              ) {
                resetField("town_or_city_residence");
                resetField("fk_locality");
              }
            }}
          >
            {departmentQuery.status === "pending" ? (
              <div></div>
            ) : departmentQuery.status === "error" ? (
              <div>Error: {departmentQuery.error.message}</div>
            ) : (
              departmentQuery.data.map((department: Department) => (
                <MenuItem key={department.id} value={department.id?.toString()}>
                  {department.name}
                </MenuItem>
              ))
            )}
          </Select>
          {formState.errors.fk_department_of_residence && (
            <FormHelperText error>
              {formState.errors.fk_department_of_residence.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          disabled={!shouldEnableCities}
          required={shouldEnableColombianOptions}
          aria-hidden={!shouldEnableCities}
        >
          <InputLabel>Municipio o ciudad de residencia</InputLabel>
          <Select
            type="number"
            {...cityOfResidenceRegister}
            value={cityOfResidence ?? ""}
            error={!!formState.errors.town_or_city_residence}
            label="Municipio o ciudad de residencia"
            onOpen={() => {
              setIsCityOfResidenceOpened((_) => true);
            }}
            onClose={() => {
              setIsCityOfResidenceOpened((_) => false);
            }}
          >
            {citiesQuery.status === "pending" ? (
              <div></div>
            ) : citiesQuery.status === "error" ? (
              <div>Error: {citiesQuery.error.message}</div>
            ) : (
              citiesQuery.data.map((city: City) => (
                <MenuItem key={city.id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))
            )}
          </Select>
          {formState.errors.town_or_city_residence && (
            <FormHelperText error>
              {formState.errors.town_or_city_residence.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl required>
          <InputLabel>Zona territorial de residencia</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.territorial_zone_residence}
            label="Zona territorial de residencia"
            {...register("territorial_zone_residence")}
          >
            {territorialZones.map((zone: string, idx: number) => (
              <MenuItem key={idx + 1} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </Select>
          {formState.errors.territorial_zone_residence && (
            <FormHelperText error>
              {formState.errors.territorial_zone_residence.message}
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          label="Dirección de residencia"
          {...register("residence_address")}
          required
          error={!!formState.errors.residence_address}
          helperText={formState.errors.residence_address?.message}
        />
        <TextField
          label="Barrio de residencia"
          {...register("neighborhood")}
          required
          error={!!formState.errors.neighborhood}
          helperText={formState.errors.neighborhood?.message}
        />
        <FormControl
          disabled={!shouldEnableLocalities}
          required={shouldEnableLocalities}
          aria-hidden={!shouldEnableLocalities}
        >
          <InputLabel>Localidad</InputLabel>
          <Select
            error={!!formState.errors.fk_locality}
            value={locality ?? ""}
            label="Localidad"
            {...register("fk_locality")}
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
          {formState.errors.fk_locality && (
            <FormHelperText error>
              {formState.errors.fk_locality.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Estrato socioeconómico</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.socioeconomic_level}
            label="Estrato socioeconómico"
            {...register("socioeconomic_level", { valueAsNumber: true })}
          >
            {economicalStatus.map((economicalStatus: number) => (
              <MenuItem key={economicalStatus} value={economicalStatus}>
                {economicalStatus}
              </MenuItem>
            ))}
          </Select>
          {formState.errors.socioeconomic_level && (
            <FormHelperText error>
              {formState.errors.socioeconomic_level.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl required>
          <InputLabel>País de nacimiento</InputLabel>
          <Select
            type="number"
            defaultValue={""}
            {...countryOfBirthRegister}
            error={!!formState.errors.fk_country_birth}
            label="País de nacimiento"
            onOpen={() => {
              setIsCountryOfBirthOpened((_) => true);
            }}
            onClose={() => {
              setIsCountryOfBirthOpened((_) => false);
            }}
            onChange={(event: SelectChangeEvent) => {
              countryOfBirthRegister.onChange(event);
              const country = event.target.value;
              if (country !== "1" && departmentOfBirth) {
                resetField!("fk_department_of_birth");
              }
            }}
          >
            {countryQuery.status === "pending" ? (
              <div></div>
            ) : countryQuery.status === "error" ? (
              <div>Error: {countryQuery.error.message}</div>
            ) : (
              countryQuery.data.map((country: Country) => (
                <MenuItem key={country.id} value={country.id?.toString()}>
                  {country.name}
                </MenuItem>
              ))
            )}
          </Select>
          {formState.errors.fk_country_birth && (
            <FormHelperText error>
              {formState.errors.fk_country_birth.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl disabled={!shouldEnableColombianOptionsBirth}>
          <InputLabel>Departamento de nacimiento</InputLabel>
          <Select
            error={!!formState.errors.fk_department_of_birth}
            value={departmentOfBirth?.toString() ?? ""}
            label="Departamento de nacimiento"
            {...register("fk_department_of_birth")}
            onOpen={() => {
              setIsDepartmentOfBirthOpened((_) => true);
            }}
            onClose={() => {
              setIsDepartmentOfBirthOpened((_) => false);
            }}
            onChange={(event: SelectChangeEvent) => {
              departmentOfBirthRegister.onChange(event);
              if (
                departmentOfBirth &&
                departmentOfBirth?.toString() !== event.target.value &&
                cityOfBirth
              ) {
                resetField!("town_or_city_birth");
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
          {formState.errors.fk_department_of_birth && (
            <FormHelperText error>
              {formState.errors.fk_department_of_birth.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl disabled={!shouldEnableCitiesBirth}>
          <InputLabel>Municipio o ciudad de nacimiento</InputLabel>
          <Select
            error={!!formState.errors.town_or_city_birth}
            value={cityOfBirth ?? ""}
            label="Municipio o ciudad de nacimiento"
            {...register("town_or_city_birth")}
            onOpen={() => {
              setIsCityOfBirthOpened((_) => true);
            }}
            onClose={() => {
              setIsCityOfBirthOpened((_) => false);
            }}
          >
            {citiesBirthQuery.status === "pending" ? (
              <div></div>
            ) : citiesBirthQuery.status === "error" ? (
              <div>Error: {citiesBirthQuery.error.message}</div>
            ) : (
              citiesBirthQuery.data.map((city: City) => (
                <MenuItem key={city.id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))
            )}
          </Select>
          {formState.errors.town_or_city_birth && (
            <FormHelperText error>
              {formState.errors.town_or_city_birth.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl required>
          <InputLabel>Zona territorial de nacimiento</InputLabel>
          <Select
            defaultValue={""}
            error={!!formState.errors.birth_territorial_zone}
            label="Zona territorial de nacimiento"
            {...register("birth_territorial_zone")}
          >
            {territorialZones.map((zone: string, idx: number) => (
              <MenuItem key={idx + 1} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </Select>
          {formState.errors.birth_territorial_zone && (
            <FormHelperText error>
              {formState.errors.birth_territorial_zone.message}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </div>
  );
}
