import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { Radio } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputHealth({ values, handleInputChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="health.answers.hasAllergies"
          title="1. ¿Tiene alguna alergia?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="health.answers.hasOperation"
          title="2. ¿Ha tenido alguna operacion?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="health.answers.hasProblemOfColumn"
          title="3. ¿Tiene algun problema de columna?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="health.answers.hasDiabetes"
          title="4. ¿Sufre de diabetes?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="health.answers.useGlasses"
          title="5. ¿Usa lentes?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="health.answers.hadCovid"
          title="6. ¿Ha tenido COVID-19?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
    </Grid>
  );
}
