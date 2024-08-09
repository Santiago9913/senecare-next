export interface Country {
  id: number;
  name: string;
  code_alfa_2: string;
  code_alfa_3: string;
  numeric_code: number | null;
}

export interface IdType {
  id: number;
  name: string;
  abbreviation: string;
}

export interface CivilState {
  id: string;
  nombre: string;
  readableName: string;
}

export interface CivilStateList {
  civil_state: CivilState[];
}

export interface GenderIdentity {
  id: string;
  nombre: string;
  readableName: string;
}

export interface GenderIdentityList {
  gender_identity: GenderIdentity[];
}

export interface BiologicalSex {
  id: string;
  nombre: string;
  readableName: string;
}

export interface BiologicalSexList {
  Biological_sex: BiologicalSex[];
}

export interface Department {
  id: number;
  name: string;
  divipola_code: string;
}

export interface City {
  id: number;
  name: string;
  divipola_code: string;
  fk_department: number;
}

export interface Locality {
  id: number;
  locality_name: string;
}

export interface LocalityList {
  locality: Locality[];
}

export interface HealthServiceProvider {
  id: number;
  name: string;
}

export interface HealthInsurancePolicy {
  id: number;
  name: string;
}

export interface UniversityLink {
  id: number;
  name: string;
}

export interface UniversityUnit {
  id: number;
  name: string;
}

export interface Disability {
  id: number;
  nombre: string;
  readableName: string;
}

export interface DisabilityList {
  Disability: Disability[];
}

export interface SexualOrientation {
  id: number;
  nombre: string;
}

export interface SexualOrientationList {
  Sexual_orientation: SexualOrientation[];
}

export interface Patient {
  id: number;
  first_name: string;
  middle_name: string | null;
  first_surname: string;
  second_surname: string | null;
  fk_type_document_number: number;
  id_number: string;
  birth_date: Date;
  biological_sex: string;
}

export type PatientList = Patient[];
