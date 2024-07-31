import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { PhoneNumberMask } from "@/app/_utils/formatters/cellPhoneFormatter";
import {
  BiologicalSex,
  CivilState,
  Country,
  GenderIdentity,
  IdType,
} from "@/app/_utils/interfaces/common";
import { CreatePatientFormProps } from "@/app/_utils/interfaces/forms";
import {
  getBiologicalSex,
  getCivilStates,
  getCountries,
  getGenderIdentities,
  getIdTypes,
} from "@/app/_utils/queries/createPatient";

export function PersonalInfoForm({
  register,
  formState,
  control,
  watch,
}: CreatePatientFormProps) {
  const [
    nationalityWatch,
    idTypeWatch,
    civilStatusWatch,
    genderWatch,
    biologicalSexWatch,
  ] = watch!([
    "fk_country_nationality",
    "fk_type_document_number",
    "civil_status",
    "gender_identity",
    "biological_sex",
  ]);

  const [isCountriesOpened, setIsCountriesOpened] = useState(false);
  const [isIdTyesOpened, setIsIdTyesOpened] = useState(false);
  const [isCivilStatusOpened, setIsCivilStatusOpened] = useState(false);
  const [isGenderIdentityOpened, setIsGenderIdentityOpened] = useState(false);
  const [isBiologicalSexOpened, setIsBiologicalSexOpened] = useState(false);

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    enabled: isCountriesOpened,
  });

  const idTypeQuery = useQuery({
    queryKey: ["idType"],
    queryFn: getIdTypes,
    enabled: isIdTyesOpened,
  });

  const civilStatesQuery = useQuery({
    queryKey: ["civilStates"],
    queryFn: getCivilStates,
    enabled: isCivilStatusOpened,
  });

  const genderIdentitiesQuery = useQuery({
    queryKey: ["genderIdentity"],
    queryFn: getGenderIdentities,
    enabled: isGenderIdentityOpened,
  });

  const biologicalSexQuery = useQuery({
    queryKey: ["biologicalSex"],
    queryFn: getBiologicalSex,
    enabled: isBiologicalSexOpened,
  });

  const bloodTypes = ["A", "B", "AB", "O"];
  const rhTypes = ["+", "-"];
  const lateralityTypes = ["Diestro", "Zurdo"];

  return (
    <div>
      <Typography variant="h5">Información personal</Typography>
      <div className="grid grid-cols-3 gap-4 p-4">
        <TextField
          label="Primer Apellido"
          {...register("first_surname")}
          error={!!formState.errors.first_surname}
          helperText={formState.errors.first_surname?.message}
          required
        />
        <TextField
          label="Segundo Apellido"
          {...register("second_surname")}
          error={!!formState.errors.second_surname}
          helperText={formState.errors.second_surname?.message}
        />
        <TextField
          label="Primer Nombre"
          {...register("first_name")}
          error={!!formState.errors.first_name}
          helperText={formState.errors.first_name?.message}
          required
        />
        <TextField
          label="Segundo Nombre"
          {...register("middle_name")}
          error={!!formState.errors.middle_name}
          helperText={formState.errors.middle_name?.message}
        />
        <TextField
          label="Usuario Uniandes"
          {...register("user_uniandes")}
          error={!!formState.errors.user_uniandes}
          helperText={formState.errors.user_uniandes?.message}
        />
        <TextField
          type="email"
          label="Correo"
          defaultValue=""
          {...register("email")}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />
        <FormControl required>
          <InputLabel>Nacionalidad</InputLabel>
          <Select
            value={nationalityWatch?.toString() ?? ""}
            label="Nacionalidad"
            {...register("fk_country_nationality")}
            error={!!formState.errors.fk_country_nationality}
            onOpen={() => {
              setIsCountriesOpened((_) => true);
            }}
            onClose={() => {
              setIsCountriesOpened((_) => false);
            }}
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
          {formState.errors.fk_country_nationality && (
            <FormHelperText error>
              {formState.errors.fk_country_nationality.message}
            </FormHelperText>
          )}
        </FormControl>
        <div className="flex space-x-4">
          <div className="flex-none w-28">
            <FormControl fullWidth required>
              <InputLabel>Tipo ID</InputLabel>
              <Select
                value={idTypeWatch ?? ""}
                label="Tipo ID"
                {...register("fk_type_document_number")}
                error={!!formState.errors.fk_type_document_number}
                onOpen={() => {
                  setIsIdTyesOpened((_) => true);
                }}
                onClose={() => {
                  setIsIdTyesOpened((_) => false);
                }}
              >
                {idTypeQuery.status === "pending" ? (
                  <div></div>
                ) : idTypeQuery.status === "error" ? (
                  <div>Error: {idTypeQuery.error.message}</div>
                ) : (
                  idTypeQuery.data.map((idType: IdType) => (
                    <MenuItem key={idType.id} value={idType.id}>
                      {idType.abbreviation}
                    </MenuItem>
                  ))
                )}
              </Select>
              {formState.errors.fk_type_document_number && (
                <FormHelperText error>
                  {formState.errors.fk_type_document_number.message}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="flex-1">
            <TextField
              type="number"
              required
              fullWidth
              label="Número ID"
              defaultValue=""
              {...register("id_number")}
              error={!!formState.errors.id_number}
              helperText={formState.errors.id_number?.message}
            />
          </div>
        </div>
        <TextField
          required
          label="Celular"
          {...register("cellphone_number")}
          error={!!formState.errors.cellphone_number}
          helperText={formState.errors.cellphone_number?.message}
          InputProps={{
            inputComponent: PhoneNumberMask as any,
          }}
        />
        <Controller
          control={control}
          name="birth_date"
          render={({ field }) => (
            <DatePicker
              maxDate={DateTime.now()}
              format="dd/MM/yyyy"
              label="Fecha de nacimiento"
              value={DateTime.fromJSDate(field.value)}
              onChange={(value) => {
                field.onChange(value?.toJSDate());
              }}
            />
          )}
        />
        <FormControl required>
          <InputLabel>Estado civil</InputLabel>
          <Select
            value={civilStatusWatch ?? ""}
            label="Estado Civil"
            {...register("civil_status")}
            error={!!formState.errors.civil_status}
            onOpen={() => {
              setIsCivilStatusOpened((_) => true);
            }}
            onClose={() => {
              setIsCivilStatusOpened((_) => false);
            }}
          >
            {civilStatesQuery.status === "pending" ? (
              <div></div>
            ) : civilStatesQuery.status === "error" ? (
              <div>Error: {civilStatesQuery.error.message}</div>
            ) : (
              civilStatesQuery.data.map((civilState: CivilState) => (
                <MenuItem key={civilState.id} value={civilState.nombre}>
                  {civilState.readableName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <div className="flex space-x-4">
          <div className="flex-1">
            <FormControl fullWidth required>
              <InputLabel>Grupo Sanguineo</InputLabel>
              <Select
                defaultValue=""
                label="Grupo Sanguineo"
                error={!!formState.errors.abotype}
                {...register("abotype")}
              >
                {bloodTypes.map((bloodType, idx) => (
                  <MenuItem key={idx + 1} value={bloodType}>
                    {bloodType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex-none w-28">
            <FormControl fullWidth required>
              <InputLabel>RH</InputLabel>
              <Select
                defaultValue=""
                label="RH"
                {...register("rh")}
                error={!!formState.errors.rh}
              >
                {rhTypes.map((rhType, idx) => (
                  <MenuItem key={idx + 1} value={rhType}>
                    {rhType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <FormControl required>
          <InputLabel>Identidad de género</InputLabel>
          <Select
            value={genderWatch ?? ""}
            label="Identidad de género"
            {...register("gender_identity")}
            error={!!formState.errors.gender_identity}
            onOpen={() => {
              setIsGenderIdentityOpened((_) => true);
            }}
            onClose={() => {
              setIsGenderIdentityOpened((_) => false);
            }}
          >
            {genderIdentitiesQuery.status === "pending" ? (
              <div></div>
            ) : genderIdentitiesQuery.status === "error" ? (
              <div>Error: {genderIdentitiesQuery.error.message}</div>
            ) : (
              genderIdentitiesQuery.data.map((gender: GenderIdentity) => (
                <MenuItem key={gender.id} value={gender.nombre}>
                  {gender.readableName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel>Sexo biológico</InputLabel>
          <Select
            value={biologicalSexWatch ?? ""}
            label="Sexo biológico"
            {...register("biological_sex")}
            error={!!formState.errors.biological_sex}
            onOpen={() => {
              setIsBiologicalSexOpened((_) => true);
            }}
            onClose={() => {
              setIsBiologicalSexOpened((_) => false);
            }}
          >
            {biologicalSexQuery.status === "pending" ? (
              <div></div>
            ) : biologicalSexQuery.status === "error" ? (
              <div>Error: {biologicalSexQuery.error.message}</div>
            ) : (
              biologicalSexQuery.data.map((biologicalSex: BiologicalSex) => (
                <MenuItem key={biologicalSex.id} value={biologicalSex.nombre}>
                  {biologicalSex.readableName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel>Lateralidad</InputLabel>
          <Select
            defaultValue=""
            label="Lateralidad"
            error={!!formState.errors.laterality}
            {...register("laterality")}
          >
            {lateralityTypes.map((laterality, idx) => (
              <MenuItem key={idx + 1} value={laterality}>
                {laterality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
