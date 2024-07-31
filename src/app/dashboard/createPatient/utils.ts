import { z } from "zod";

export const createPatientFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  middle_name: z
    .string()
    .trim()
    .nullish()
    .transform((x) => x ?? null),
  first_surname: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  second_surname: z
    .string()
    .trim()
    .nullish()
    .transform((x) => x ?? null),
  user_uniandes: z.string().trim().toLowerCase(),
  email: z.string().trim().toLowerCase().email(),
  fk_country_nationality: z.coerce.number(),
  fk_type_document_number: z.coerce.number(),
  id_number: z.string().trim().min(1).max(20),
  cellphone_number: z
    .string()
    .trim()
    .transform((x) => x.replace("-", "").replace(" ", "").trim()),
  birth_date: z.date(),
  civil_status: z.enum([
    "Solter_",
    "Casad_",
    "Uni_n_libre",
    "Viud_",
    "Divorciad_",
  ]),
  abotype: z.enum(["A", "B", "AB", "O", "undefined"]),
  rh: z.enum(["+", "-"]).transform((x) => (x === "+" ? true : false)),
  gender_identity: z.enum([
    "Masculino",
    "Femenino",
    "Transg_nero",
    "Neutro",
    "No_lo_declara",
  ]),
  biological_sex: z.enum(["Hombre", "Mujer", "Indeterminado_intersexual"]),
  laterality: z
    .enum(["Diestro", "Zurdo"])
    .transform((x) => (x === "Diestro" ? true : false)),
  fk_country_residence_habitual: z.coerce.number(),
  fk_department_of_residence: z.coerce
    .number()
    .nullish()
    .transform((x) => x ?? null),
  town_or_city_residence: z.coerce
    .number()
    .nullish()
    .transform((x) => x ?? null),
  territorial_zone_residence: z.enum(["Urbana", "Rural"]),
  residence_address: z.string().trim(),
  neighborhood: z.string().trim().min(2),
  fk_locality: z.coerce
    .number()
    .nullish()
    .transform((x) => x ?? null),
  socioeconomic_level: z.number().int().min(1).max(6),
  fk_country_birth: z.coerce.number(),
  fk_department_of_birth: z.coerce
    .number()
    .nullish()
    .transform((x) => x ?? null),
  town_or_city_birth: z.coerce
    .number()
    .nullish()
    .transform((x) => x ?? null),
  birth_territorial_zone: z.enum(["Urbana", "Rural"]),
  emergency_contact_name: z.string().trim().min(2).max(100),
  emergency_contact_number: z
    .string()
    .trim()
    .transform((x) => x.replace("-", "").replace(" ", "").trim()),
  emergency_contact_relationship: z.enum([
    "Familiar",
    "Pareja",
    "Amigo",
    "Otro",
  ]),
  fk_health_services_provider: z.coerce.number(),
  regimen: z.enum(["Contributivo", "Subsidiado", "Especial", "Extranjero"]),
  additional_health_service_type: z.enum([
    "Póliza",
    "Seguro intermacional",
    "Plan complementario",
    "Prepagada",
    "Otra",
    "Ninguno",
  ]),
  fk_health_insurance_policy: z.coerce
    .number()
    .nullish()
    .transform((x) => x ?? null),
  fk_university_link: z.coerce.number(),
  fk_unit: z.coerce.number(),
  disability: z.enum([
    "Discapacidad_f_sica",
    "Discapacidad_visual",
    "Discapacidad_auditiva",
    "Discapacidad_intelectual",
    "Discapacidad_sicosocial__mental_",
    "Sordoceguera",
    "Discapacidad_m_ltiple",
    "Sin_discapacidad",
  ]),
});
