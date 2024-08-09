import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { IdType, Patient, PatientList } from "@/app/_utils/interfaces/common";

interface SearchBarProps {
  options: PatientList;
  idTypeOptions: IdType[];
  loading: boolean;
  idType: number | null;
  onChange: (value: Patient) => void;
  onInputChange: (value: string) => void;
  onIdTypeChange: (value: string | number) => void;
}

export function SearchBar({
  options,
  idTypeOptions,
  loading,
  idType,
  onChange,
  onInputChange,
  onIdTypeChange,
}: SearchBarProps) {
  const buildFullName = (patient: Patient) => {
    let fullName = `${patient.first_name}`;
    if (patient.middle_name) {
      fullName += ` ${patient.middle_name}`;
    }
    fullName += ` ${patient.first_surname}`;
    if (patient.second_surname) {
      fullName += ` ${patient.second_surname}`;
    }
    return fullName;
  };

  return (
    <div className="w-full flex">
      <div className="flex-none w-28">
        <FormControl fullWidth>
          <InputLabel>Tipo ID</InputLabel>
          <Select
            label="Tipo ID"
            onChange={(e) => onIdTypeChange(e.target.value)}
            value={idType ?? ""}
          >
            {idTypeOptions.map((idType: IdType) => {
              return (
                <MenuItem key={idType.id} value={idType.id}>
                  {idType.abbreviation}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="flex-1">
        <Autocomplete
          disabled={idType === null}
          autoHighlight
          options={options}
          isOptionEqualToValue={(option: Patient, value: Patient) =>
            option.id === value.id
          }
          getOptionLabel={(option: Patient) => {
            let fullName = buildFullName(option);
            return `${fullName} - ${option.id_number}`;
          }}
          onInputChange={(_, value) => {
            onInputChange(value);
          }}
          onChange={(_, value) => {
            if (value) {
              onChange(value);
            }
          }}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              disabled={idType === null}
              label="Buscar paciente"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    </div>
  );
}
