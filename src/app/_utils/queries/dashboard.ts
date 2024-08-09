import { Patient, PatientList } from "../interfaces/common";
import queryFunction from "../queyFunction";

export async function getAllPatients(idType: number | null, idNumber: string) {
  if (idType === null) return;
  const data: PatientList = await queryFunction<PatientList>({
    method: "GET",
    path: `patient/id_type/${idType}/${idNumber}`,
  });

  return data;
}
