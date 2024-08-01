"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createPatient } from "@/app/_utils/queries/createPatient";
import { SenecareButton } from "@/app/cross-components/buttons/button";
import { AlertSnackbar } from "@/app/cross-components/feedback/alertSnackbar";

import { GeographicInfoForm } from "./_forms/geographicInfoForm";
import { OtherInfoForm } from "./_forms/otherInfoForm";
import { PersonalInfoForm } from "./_forms/personalInfoForm";
import { createPatientFormSchema } from "./schema";
import type { CreatePatientSchema } from "./schema";

export default function CreatePatientView() {
  const snackBarDuration = 3000;

  const router = useRouter();

  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const form = useForm<CreatePatientSchema>({
    resolver: zodResolver(createPatientFormSchema),
  });

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onError: (error, _, __) => {
      setSeverity((_) => "error");
      setMessage((_) => `Error al crear el paciente. ${error.message}`);
      setIsAlertOpen((_) => true);
    },
    onSuccess: () => {
      setSeverity((_) => "success");
      setMessage(
        (_) => "Paciente creado exitosamente. Redirigiendo al dashboard..."
      );
      setIsAlertOpen((_) => true);
      setTimeout(() => {
        router.replace("/dashboard");
      }, snackBarDuration);
    },
  });

  const { register, formState, control, watch, resetField, handleSubmit } =
    form;

  const onSubmit = (data: CreatePatientSchema) => {
    console.log(data);
    createPatientMutation.mutate(data);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <PersonalInfoForm
        register={register}
        formState={formState}
        control={control}
        watch={watch}
        resetField={resetField}
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
        <SenecareButton
          text="Crear Paciente"
          variant="contained"
          type="submit"
          disabled={createPatientMutation.isSuccess}
          isLoading={createPatientMutation.isPending}
        />
      </div>
      <AlertSnackbar
        open={isAlertOpen}
        severity={severity}
        autoHideDuration={snackBarDuration}
        message={message}
        onClose={() => setIsAlertOpen(false)}
      />
    </form>
  );
}
