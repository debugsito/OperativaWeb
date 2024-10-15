import React from "react";
import { Grid } from "@material-ui/core";

import FormController from "../../../shared/formControllers";

export default function InputPersonal() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="personal.answers.questionPersonalOne.value"
          title="1. ¿Si no está contento con una situación puede decirlo?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="personal.answers.questionPersonalTwo.value"
          title="2. ¿Se considera una persona responsable?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="personal.answers.questionPersonalThree.value"
          title="3. ¿Le motiva trabajar como operario?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="personal.answers.questionPersonalFour.value"
          title="4. ¿Cuanto toma decisiones suele cambiar de parecer a cada momento?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="personal.answers.questionPersonalFive.value"
          title="5. ¿Tuvo problemas alguna vez con compañeros o jefes?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="personal.answers.questionPersonalSix.value"
          title="6. ¿Prefiere trabajar solo o en grupo?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
      </Grid>
    </Grid>
  );
}
