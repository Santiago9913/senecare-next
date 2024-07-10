import {
  BiologicalSexList,
  CivilState,
  CivilStateList,
  Country,
  GenderIdentityList,
  IdType,
} from "../interfaces/common";
import {
  translateBiologicalSexEnumToName,
  translateCivilStateEnumToName,
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
