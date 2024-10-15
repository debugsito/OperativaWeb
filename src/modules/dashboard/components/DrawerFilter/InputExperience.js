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
            name="experience.answers.with_experience_one.active"
            type="checkbox"
            label="Menos de 6 meses"
          />
          <FormController
            name="experience.answers.with_experience_two.active"
            type="checkbox"
            label="1 año"
          />
          <FormController
            name="experience.answers.with_experience_three.active"
            type="checkbox"
            label="2 años"
          />
          <FormController
            name="experience.answers.with_experience_four.active"
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
            name="experience.answers.whitout_experience_one.active"
          />
          <FormController
            type="checkbox"
            label="Disponible para horario rotativos"
            name="experience.answers.whitout_experience_two.active"
          />
          <FormController
            type="checkbox"
            label="Disponible para horas extras."
            name="experience.answers.whitout_experience_three.active"
          />
          <FormController
            type="checkbox"
            label="Disponible para fines de semana."
            name="experience.answers.whitout_experience_four.active"
          />
          <FormController
            type="checkbox"
            label="Disponible para viajar."
            name="experience.answers.whitout_experience_five.active"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
