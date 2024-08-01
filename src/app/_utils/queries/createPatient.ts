import { AxiosResponse } from "axios";

import { CreatePatientSchema } from "@/app/dashboard/createPatient/schema";

import {
  BiologicalSexList,
  City,
  CivilState,
  CivilStateList,
  Country,
  Department,
  Disability,
  DisabilityList,
  GenderIdentityList,
  HealthInsurancePolicy,
  HealthServiceProvider,
  IdType,
  Locality,
  SexualOrientation,
  SexualOrientationList,
  UniversityLink,
  UniversityUnit,
} from "../interfaces/common";
import {
  translateBiologicalSexEnumToName,
  translateCivilStateEnumToName,
  translateDiasabilityEnumToName,
  translateGenderIdentityEnumToName,
} from "../interfaces/utils";
import queryFunction from "../queyFunction";

export async function getCountries() {
  const data: Country[] = await queryFunction<Country[]>({
    method: "GET",
    path: "Country",
  });

  return data;
}

export async function getIdTypes() {
  const data: IdType[] = await queryFunction<IdType[]>({
    method: "GET",
    path: "id_type",
  });

  return data;
}

export async function getCivilStates() {
  const data: CivilStateList = await queryFunction<CivilStateList>({
    method: "GET",
    path: "civil_state/list",
  });

  data.civil_state.forEach((state) => {
    state.readableName = translateCivilStateEnumToName(state.nombre);
  });

  return data.civil_state;
}

export async function getGenderIdentities() {
  const data: GenderIdentityList = await queryFunction<GenderIdentityList>({
    method: "GET",
    path: "gender_identity/list",
  });

  data.gender_identity.forEach((gender) => {
    gender.readableName = translateGenderIdentityEnumToName(gender.nombre);
  });

  return data.gender_identity;
}

export async function getBiologicalSex() {
  const data: BiologicalSexList = await queryFunction<BiologicalSexList>({
    method: "GET",
    path: "Biological_sex/list",
  });

  data.Biological_sex.forEach((biologicalSex) => {
    biologicalSex.readableName = translateBiologicalSexEnumToName(
      biologicalSex.nombre
    );
  });

  return data.Biological_sex;
}

export async function getDepartments() {
  const data: Department[] = await queryFunction<Department[]>({
    method: "GET",
    path: "Department",
  });

  return data;
}

export async function getCities(idDepartment: number | null) {
  if (idDepartment === null) throw new Error("idDepartment is null");
  const data: City[] = await queryFunction<City[]>({
    method: "GET",
    path: `town/department/${idDepartment}`,
  });

  return data;
}

export async function getLocalities() {
  const data: Locality[] = await queryFunction<Locality[]>({
    method: "GET",
    path: "locality",
  });

  return data;
}

export async function getHealthServiceProviders() {
  const data: HealthServiceProvider[] = await queryFunction<
    HealthServiceProvider[]
  >({
    method: "GET",
    path: "health_services_provider",
  });

  return data;
}

export async function getHealthInsurancePolicy() {
  const data: HealthInsurancePolicy[] = await queryFunction<
    HealthInsurancePolicy[]
  >({
    method: "GET",
    path: "health_insurance_policy",
  });

  return data;
}

export async function getUniversityLink() {
  const data: UniversityLink[] = await queryFunction<UniversityLink[]>({
    method: "GET",
    path: "university_link",
  });

  return data;
}

export async function getUniversityUnit() {
  const data: UniversityUnit[] = await queryFunction<UniversityUnit[]>({
    method: "GET",
    path: "unit",
  });

  return data;
}

export async function getDisabilities() {
  const data: DisabilityList = await queryFunction<DisabilityList>({
    method: "GET",
    path: "disability/list",
  });
  data.Disability.forEach((disability) => {
    disability.readableName = translateDiasabilityEnumToName(disability.nombre);
  });

  return data.Disability;
}

export async function getSexualOrientations() {
  const data: SexualOrientationList =
    await queryFunction<SexualOrientationList>({
      method: "GET",
      path: "sexual_orientation/list",
    });

  return data.Sexual_orientation;
}

export async function createPatient(data: CreatePatientSchema) {
  return queryFunction<AxiosResponse>({
    method: "POST",
    path: "patient",
    data,
  });
}
