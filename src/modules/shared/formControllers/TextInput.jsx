import React from "react";
import { useController } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const TextInput = ({ name, control, ...rest }) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: "",
  });
  //   console.log('error', error)
  return (
    <>
      {/* <TextField
                {...field}
                fullWidth
                label="Nombre"
                // error={!!errors?.addresses?.[index]?.name}
                // helperText={errors?.addresses?.[index]?.name?.message}
            /> */}
      <TextField {...field} {...rest} />
    </>
  );
};

export default TextInput;
