import React from "react";
import { Grid } from "@material-ui/core";
import FormController from "../../../shared/formControllers";

export default function InputSalaryExpectations({ values, handleInputChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormController
          type="input"
          fullWidth
          label="Desde"
          variant="outlined"
          name="age.answers.from"
          helperText="Ejemplo: 20"
        />
      </Grid>
      <Grid item xs={6}>
        <FormController
          type="input"
          fullWidth
          label="Hasta"
          variant="outlined"
          name="age.answers.to"
          helperText="Ejemplo: 35"
        />
      </Grid>
    </Grid>
  );
}
