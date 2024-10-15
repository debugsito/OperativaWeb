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

export default function InputFamily() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="family.answers.hasChildren.value"
          title="1. ¿Tiene hijos?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="family.answers.hasResponsabilityPerson.value"
          title="2. ¿Tiene alguna persona bajo su responsabilidad?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="family.answers.liveAlone.value"
          title="3. Vive solo/a."
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
    </Grid>
  );
}
