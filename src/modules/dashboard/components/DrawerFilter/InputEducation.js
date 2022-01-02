import React from "react";
import { FormGroup, Grid } from "@material-ui/core";
import { Checkbox } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputEducation() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormGroup>
          <FormController
            type="checkbox"
            label="Sin Estudios"
            name="education.answers.whitout_education"
          />
          <FormController
            type="checkbox"
            label="Primaria incompleta"
            name="education.answers.education_primary_incomplete"
          />
          <FormController
            type="checkbox"
            label="Primaria completa"
            name="education.answers.education_primary_complete"
          />
          <FormController
            type="checkbox"
            label="Secundaria incompleta"
            name="education.answers.education_secundary_incomplete"
          />
          <FormController
            type="checkbox"
            label="Secundaria completa"
            name="education.answers.education_secundary_complete"
          />
          <FormController
            type="checkbox"
            label="Técnico superior incompleto"
            name="education.answers.education_tecnic_incomplete"
          />
          <FormController
            type="checkbox"
            label="Técnico superior completo"
            name="education.answers.education_tecnic_complete"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
