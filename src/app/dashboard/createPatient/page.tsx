"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GeographicInfoForm } from "./_forms/geographicInfoForm";
import { OtherInfoForm } from "./_forms/otherInfoForm";
import { PersonalInfoForm } from "./_forms/personalInfoForm";
import { createPatientFormSchema } from "./utils";

export default function CreatePatientView() {
  const form = useForm<z.infer<typeof createPatientFormSchema>>({
    resolver: zodResolver(createPatientFormSchema),
  });

  const { register, formState, control, watch, resetField, handleSubmit } =
    form;

  const onSubmit = (data: z.infer<typeof createPatientFormSchema>) => {
    console.log(data);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <PersonalInfoForm
        register={register}
        formState={formState}
        control={control}
      />
      <div>
        <GeographicInfoForm
          register={register}
          formState={formState}
          control={control}
          watch={watch}
          resetField={resetField}
        />
      </div>
      <div>
        <OtherInfoForm
          register={register}
          formState={formState}
          control={control}
          watch={watch}
          resetField={resetField}
        />
      </div>
      <div className="pb-4">
        <Button variant="contained" type="submit">
          Crear Paciente
        </Button>
      </div>
    </form>
  );
}
