import { z } from "zod";

export const createPatientFormSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  secondName: z.string().nullable(),
  firstSurname: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  secondSurname: z.string().nullable(),
  username: z.string().min(2),
  email: z
    .string()
    .email()
    .regex(/@uniandes\.edu\.co/),
  nationality: z.string().min(2),
  idType: z.enum(["CC", "TI", "CE", "RC", "PA", "SI"]),
  idNumber: z.string().min(3),
  phoneNumber: z.string(),
  birthDate: z.date(),
  civilStatus: z.enum([
    "Solter@",
    "Casad@",
    "Divorciad@",
    "Viud@",
    "Union Libre",
  ]),
  bloodType: z.enum(["A", "B", "AB", "O", "undefined"]),
  rh: z.enum(["+", "-"]),
  gender: z.enum([
    "Masculino",
    "Femenino",
    "Transgénero",
    "Neutro",
    "No lo declara",
  ]),
  biologicalSex: z.enum(["Hombre", "Mujer", "Indeterminado/Intersexual"]),
  laterality: z.enum(["Diestro", "Zurdo"]),
  countryOfResidence: z.string(),
  departmentOfResidence: z.string().nullable(),
  cityOfResidence: z.string(),
  territorialZone: z.enum(["Urbana", "Rural"]),
  addressOfResidence: z.string(),
  neighborhood: z.string().min(2),
  locality: z.string().nullable(),
  economicalStatus: z.number().int().min(1).max(6),
  countryOfBirth: z.string().min(2),
  departmentOfBirth: z.string().min(2),
  cityOfBirth: z.string().min(2),
  territorialZoneOfBirth: z.enum(["Urbana", "Rural"]),
  emergencyContactName: z.string().min(2),
  emergencyContactPhoneNumber: z.string(),
  emergencyRelationship: z.enum(["Familiar", "Pareja", "Amigo", "Otro"]),
  healthServiceProvider: z.string().min(2),
  healthRegime: z.enum([
    "Contributivo",
    "Subsidiado",
    "Especial",
    "Extranjero",
  ]),
  additionalHealthServiceType: z.enum([
    "Póliza",
    "Seguro intermacional",
    "Plan complementario",
    "Prepagada",
    "Otra",
    "Ninguno",
  ]),
  healthInsurancePolicy: z.string().min(2),
  universityLink: z.string().min(2),
  universityUnit: z.string().min(2),
  disability: z.string().min(2),
});

interface CreatePatientValuesDefault
  extends Partial<z.infer<typeof createPatientFormSchema>> {}

export const defaultCreatePatientValues: CreatePatientValuesDefault = {
  firstName: "",
  secondName: null,
  firstSurname: "",
  secondSurname: null,
  username: "",
  email: "",
  nationality: "",
  idNumber: "",
  phoneNumber: "",
  addressOfResidence: "",
  neighborhood: "",
};
