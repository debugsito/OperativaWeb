import React from "react";
import { FormGroup, Grid, Typography } from "@material-ui/core";
import { Checkbox } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputRubro({ values, handleInputChange }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="body1">El postulante manifiesta:</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormController
            type="checkbox"
            label="Viajaría al interior del país"
            name="extra.answers.question_one.active"
          />
          <FormController
            type="checkbox"
            label="Trabajar en horarios rotativos"
            name="extra.answers.question_two.active"
          />
          <FormController
            type="checkbox"
            label="Trabajar horas extras"
            name="extra.answers.question_three.active"
          />
          <FormController
            type="checkbox"
            label="Trabajar fines de semana?"
            name="extra.answers.question_four.active"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
