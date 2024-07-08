import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  id: string;
  placeholder: string;
  htmlFor: string;
};

export default function TextField({
  label,
  type,
  id,
  placeholder,
  htmlFor,
}: Props) {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={htmlFor}>{label}</Label>
        <Input type={type} id={id} placeholder={placeholder} />
      </div>
    </>
  );
}
