export function translateCivilStateEnumToName(civilState: string) {
  switch (civilState) {
    case "Solter_":
      return "Solter@";
    case "Casad_":
      return "Casad@";
    case "Uni_n_libre":
      return "Unión Libre";
    case "Viud_":
      return "Viud@";
    case "Divorciad_":
      return "Divorciad@";
    default:
      return "No lo declara";
  }
}

export function translateGenderIdentityEnumToName(genderIdentity: string) {
  switch (genderIdentity) {
    case "Masculino":
      return "Masculino";
    case "Femenino":
      return "Femenino";
    case "Transg_nero":
      return "Transgénero";
    case "Neutro":
      return "Neutro";
    case "No_lo_declara":
      return "No lo declara";
    default:
      return "No lo declara";
  }
}

export function translateBiologicalSexEnumToName(biologicalSex: string) {
  switch (biologicalSex) {
    case "Hombre":
      return "Hombre";
    case "Mujer":
      return "Mujer";
    case "Indeterminado_intersexual":
      return "Indeterminado/Intersexual";
    default:
      return "No lo declara";
  }
}

export function translateDiasabilityEnumToName(disability: string) {
  switch (disability) {
    case "Discapacidad_f_sica":
      return "Discapacidad física";
    case "Discapacidad_visual":
      return "Discapacidad visual";
    case "Discapacidad_auditiva":
      return "Discapacidad auditiva";
    case "Discapacidad_intelectual":
      return "Discapacidad intelectual";
    case "Discapacidad_sicosocial__mental_":
      return "Discapacidad sicosocial (mental)";
    case "Sordoceguera":
      return "Sordoceguera";
    case "Discapacidad_m_ltiple":
      return "Discapacidad múltiple";
    case "Sin_discapacidad":
      return "Sin discapacidad";
    default:
      return "No aplica";
  }
}
