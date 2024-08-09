"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

import { Patient } from "../_utils/interfaces/common";
import { getIdTypes } from "../_utils/queries/createPatient";
import { getAllPatients } from "../_utils/queries/dashboard";
import { SearchBar } from "../cross-components/inputs/searchBar";

export default function Dashboard() {
  const [patientId, setPatientId] = useState<string>("");
  const [idType, setIdType] = useState<number | null>(null);
  const debouncer = useDebounce(patientId, 500);

  const idTypeQuery = useQuery({
    queryKey: ["idType"],
    queryFn: getIdTypes,
  });

  const patientsQuery = useQuery({
    queryKey: ["patients", debouncer, idType],
    queryFn: async () => {
      const data = await getAllPatients(idType, debouncer);
      return data;
    },
    enabled: debouncer.length > 0 && idType !== null,
  });

  const hanldeOnSearchBarInputChange = (patientId: string) => {
    setPatientId(patientId);
  };

  const handleOnIdTypeSelected = (idType: string | number) => {
    setIdType(+idType);
  };

  const handleOnSeacrgBarChange = (patient: Patient) => {};

  return (
    <div className="bg-white h-full">
      <div className="p-4">
        <SearchBar
          idType={idType}
          options={patientsQuery.data ?? []}
          idTypeOptions={idTypeQuery.data ?? []}
          loading={patientsQuery.isLoading}
          onIdTypeChange={handleOnIdTypeSelected}
          onChange={handleOnSeacrgBarChange}
          onInputChange={hanldeOnSearchBarInputChange}
        />
      </div>
    </div>
  );
}
