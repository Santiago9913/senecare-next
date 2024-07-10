"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { createPatientFormSchema } from "./utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  getBiologicalSex,
  getCivilStates,
  getCountries,
  getGenderIdentities,
  getIdTypes,
} from "@/app/_utils/queries/createPatient";

export default function CreatePatientView() {
  const form = useForm<z.infer<typeof createPatientFormSchema>>({
    resolver: zodResolver(createPatientFormSchema),
  });
  const [isCountriesOpened, setIsCountriesOpened] = useState(false);
  const [isIdTyesOpened, setIsIdTypesOpened] = useState(false);
  const [isCivilStatusOpened, setIsCivilStatusOpened] = useState(false);
  const [isGenderIdentityOpened, setIsGenderIdentityOpened] = useState(false);
  const [isBiologicalSexOpened, setIsBiologicalSexOpened] = useState(false);

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    enabled: isCountriesOpened,
  });

  const idTypeQuery = useQuery({
    queryKey: ["idType"],
    queryFn: getIdTypes,
    enabled: isIdTyesOpened,
  });

  const civilStatesQuery = useQuery({
    queryKey: ["civilStates"],
    queryFn: getCivilStates,
    enabled: isCivilStatusOpened,
  });

  const genderIdentitiesQuery = useQuery({
    queryKey: ["genderIdentity"],
    queryFn: getGenderIdentities,
    enabled: isGenderIdentityOpened,
  });

  const biologicalSexQuery = useQuery({
    queryKey: ["biologicalSex"],
    queryFn: getBiologicalSex,
    enabled: isBiologicalSexOpened,
  });

  const bloodTypes = ["A", "B", "AB", "O"];
  const rhTypes = ["+", "-"];
  const lateralityTypes = ["Diestro", "Zurdo"];

  return (
    <Form {...form}>
      <form className="space-y-8">
        Datos Personales
        <div className="grid grid-cols-3 gap-4 p-4">
          <div>
            <FormField
              control={form.control}
              name="firstSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer Apellido</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="text"
                      placeholder="Primer Apellido"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="secondSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Segundo Apellido" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Primer Nombre" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="secondName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Segundo Nombre" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario Uniandes</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Usuario Uniandes"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Uniandes</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Correo Uniandes"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onOpenChange={(isOpen) =>
                      setIsCountriesOpened((_) => isOpen)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Nacionalidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryQuery.status === "pending" ? (
                        <div></div>
                      ) : countryQuery.status === "error" ? (
                        <div>Error: {countryQuery.error.message}</div>
                      ) : (
                        countryQuery.data.map((country) => (
                          <SelectItem key={country.id} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-none w-16">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      onOpenChange={(isOpen) =>
                        setIsIdTypesOpened((_) => isOpen)
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo ID" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {idTypeQuery.status === "pending" ? (
                          <div></div>
                        ) : idTypeQuery.status === "error" ? (
                          <div>Error: {idTypeQuery.error.message}</div>
                        ) : (
                          idTypeQuery.data.map((idType) => (
                            <SelectItem key={idType.id} value={idType.name}>
                              {idType.abbreviation}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número ID</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Número ID" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Número Celular" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="h-full">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col h-full justify-end">
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="civilStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onOpenChange={(isOpen) =>
                      setIsCivilStatusOpened((_) => isOpen)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Estado Civil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {civilStatesQuery.status === "pending" ? (
                        <div></div>
                      ) : civilStatesQuery.status === "error" ? (
                        <div>Error: {civilStatesQuery.error.message}</div>
                      ) : (
                        civilStatesQuery.data.map((civilState) => (
                          <SelectItem
                            key={civilState.id}
                            value={civilState.nombre}
                          >
                            {civilState.readableName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo Sanguíneo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Grupo Sanguíneo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodTypes.map((bloodType, idx) => (
                          <SelectItem key={idx + 1} value={bloodType}>
                            {bloodType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-none w-16">
              <FormField
                control={form.control}
                name="rh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RH</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="RH" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rhTypes.map((rhType, idx) => (
                          <SelectItem key={idx + 1} value={rhType}>
                            {rhType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identidad de género</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onOpenChange={(isOpen) =>
                      setIsGenderIdentityOpened((_) => isOpen)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Identidad de género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderIdentitiesQuery.status === "pending" ? (
                        <div></div>
                      ) : genderIdentitiesQuery.status === "error" ? (
                        <div>Error: {genderIdentitiesQuery.error.message}</div>
                      ) : (
                        genderIdentitiesQuery.data.map((gender) => (
                          <SelectItem key={gender.id} value={gender.nombre}>
                            {gender.readableName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="biologicalSex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo biológico</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onOpenChange={(isOpen) =>
                      setIsBiologicalSexOpened((_) => isOpen)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sexo biológico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {biologicalSexQuery.status === "pending" ? (
                        <div></div>
                      ) : biologicalSexQuery.status === "error" ? (
                        <div>Error: {biologicalSexQuery.error.message}</div>
                      ) : (
                        biologicalSexQuery.data.map((biologicalSex) => (
                          <SelectItem
                            key={biologicalSex.id}
                            value={biologicalSex.nombre}
                          >
                            {biologicalSex.readableName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="laterality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lateralidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onOpenChange={(isOpen) =>
                      setIsBiologicalSexOpened((_) => isOpen)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Lateralidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lateralityTypes.map((laterality, idx) => (
                        <SelectItem key={idx + 1} value={laterality}>
                          {laterality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
