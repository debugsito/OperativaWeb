import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
} from "@material-ui/core";
import { Radio, Typography } from "../../../shared/components";
import { useController, useFormContext } from "react-hook-form";

function InputTransport() {
  const methods = useFormContext();
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: "transport.has_transport",
    control: methods.control,
    defaultValue: "",
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>
          El postulante declara que tiene facilidad para acceder a medios de
          transporte público o dispone de uno privado.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="hasTransport"
            name="transport.answers.hasTransport.value"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <FormControlLabel value="Si" control={<Radio />} label="Si" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default InputTransport;
