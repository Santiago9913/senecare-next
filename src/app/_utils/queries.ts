import { Country, IdType } from "./interfaces/common";
import queryFunction from "./queyFunction";

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
