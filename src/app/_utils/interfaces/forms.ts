import {
  Control,
  FormState,
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";

import { createPatientFormSchema } from "@/app/dashboard/createPatient/utils";

export interface CreatePatientFormProps {
  register: UseFormRegister<z.infer<typeof createPatientFormSchema>>;
  formState: FormState<z.infer<typeof createPatientFormSchema>>;
  control: Control<z.infer<typeof createPatientFormSchema>>;
  watch: UseFormWatch<z.infer<typeof createPatientFormSchema>>;
  resetField: UseFormResetField<z.infer<typeof createPatientFormSchema>>;
}
