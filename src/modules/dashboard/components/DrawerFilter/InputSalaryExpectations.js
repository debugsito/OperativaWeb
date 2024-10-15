import React from "react";
import { Grid } from "@material-ui/core";
import { TextInput } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputSalaryExpectations() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormController
          type="input"
          name="salaryExpectations.answers.from"
          label="Desde"
          variant="outlined"
          helperText="En soles Neto S/"
        />
      </Grid>
      <Grid item xs={6}>
        <FormController
          type="input"
          name="salaryExpectations.answers.to"
          label="Hasta"
          variant="outlined"
          helperText="En soles Neto S/"
        />
      </Grid>
    </Grid>
  );
}
