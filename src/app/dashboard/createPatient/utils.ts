import { z } from "zod";

export const createPatientFormSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  secondName: z.string().min(2).nullable(),
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
  phoneNumber: z.string().min(10).max(10),
  birthDate: z.date(),
  civilStatus: z.enum([
    "Solter@",
    "Casad@",
    "Divorciad@",
    "Viud@",
    "Union Libre",
  ]),
  bloodType: z.enum(["A", "B", "AB", "O"]),
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
  countryOfResidence: z.string().min(2),
  departmentOfResidence: z.string().min(2),
  cityOfResidence: z.string().min(2),
  territorialZone: z.enum(["Urbana", "Rural"]),
  addressOfResidence: z.string().min(2),
  neighborhood: z.string().min(2),
  locality: z.string().min(2),
  economicalStatus: z.number().int().min(1).max(6),
  countryOfBirth: z.string().min(2),
  departmentOfBirth: z.string().min(2),
  cityOfBirth: z.string().min(2),
  territorialZoneOfBirth: z.enum(["Urbana", "Rural"]),
});
