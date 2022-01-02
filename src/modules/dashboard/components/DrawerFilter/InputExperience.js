import React from "react";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@material-ui/core";
import { Checkbox } from "../../../shared/components";
import { useController, useFormContext } from "react-hook-form";
import FormController from "../../../shared/formControllers";

export default function InputExperience() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          <b>Con experiencia:</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormController
            name="experience.answers.with_experience_one"
            type="checkbox"
            label="Menos de 6 meses"
          />
          <FormController
            name="experience.answers.with_experience_two"
            type="checkbox"
            label="1 año"
          />
          <FormController
            name="experience.answers.with_experience_three"
            type="checkbox"
            label="2 años"
          />
          <FormController
            name="experience.answers.with_experience_four"
            type="checkbox"
            label="3 años a más"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          <b>Sin experiencia:</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormController
            type="checkbox"
            label="Realizó Voluntariado"
            name="experience.answers.whitout_experience_one"
          />
          <FormController
            type="checkbox"
            label="Disponible para horario rotativos"
            name="experience.answers.whitout_experience_two"
          />
          <FormController
            type="checkbox"
            label="Disponible para horas extras."
            name="experience.answers.whitout_experience_three"
          />
          <FormController
            type="checkbox"
            label="Disponible para fines de semana."
            name="experience.answers.whitout_experience_four"
          />
          <FormController
            type="checkbox"
            label="Disponible para viajar."
            name="experience.answers.whitout_experience_five"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
