import React from "react";
import { FormGroup, Grid, Typography } from "@material-ui/core";
import { Checkbox } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputGender() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormGroup>
          <FormController
            type="checkbox"
            label="Masculino"
            name="gender.answers.male"
          />
          <FormController
            type="checkbox"
            label="Femenino"
            name="gender.answers.female"
          />
          <FormController type="checkbox" label="Otro" name="gender.other" />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
