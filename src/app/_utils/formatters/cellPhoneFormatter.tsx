import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

import { CustomProps } from "../interfaces/formatters";

export const PhoneNumberMask = forwardRef<HTMLInputElement, CustomProps>(
  function PhoneNumberMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="### ###-####"
        definitions={{
          "#": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => {
          onChange({
            target: {
              name: props.name,
              value: value,
            },
          });
        }}
        overwrite
      />
    );
  }
);
