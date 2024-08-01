import {
  Control,
  FormState,
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";

import type { CreatePatientSchema } from "@/app/dashboard/createPatient/schema";

export interface CreatePatientFormProps {
  register: UseFormRegister<CreatePatientSchema>;
  formState: FormState<CreatePatientSchema>;
  control: Control<CreatePatientSchema>;
  watch: UseFormWatch<CreatePatientSchema>;
  resetField: UseFormResetField<CreatePatientSchema>;
}
