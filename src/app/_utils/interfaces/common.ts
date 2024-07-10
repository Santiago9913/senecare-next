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
