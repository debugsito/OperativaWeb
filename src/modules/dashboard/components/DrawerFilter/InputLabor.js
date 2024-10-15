import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { Radio, Typography } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputLabor({ values, handleInputChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          Conoce a tu postulante filtrando según lo que respondió en el
          cuestionario de registro:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="labor.answers.workedAsOperator.value"
          title="1. ¿Trabajo camo operario?"
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
        {/* <FormControl component="fieldset">
                <FormLabel>1. ¿Trabajo camo operario?</FormLabel>
                    <RadioGroup row aria-label="¿trabajo como operario?" name="hasOperator" value={values.hasOperator} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl> */}
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="labor.answers.quitHisJob.value"
          title="2. Abandonó un trabajo porque no le gustaba."
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
        {/* <FormControl component="fieldset">
          <FormLabel>2. Abandonó un trabajo porque no le gustaba.</FormLabel>
          <RadioGroup
            row
            aria-label="Abandonó un trabajo porque no le gustaba"
            name="quitHisJob"
            value={values.quitHisJob}
            onChange={handleInputChange}
          >
            <FormControlLabel value="Si" control={<Radio />} label="Si" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl> */}
      </Grid>
      <Grid item xs={12}>
        <FormController
          type="radioButtons"
          name="labor.answers.hasUnionSindicate.value"
          title="3. Perteneció a un sindicato."
          items={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
          ]}
        />
        {/* <FormControl component="fieldset">
          <FormLabel>3. Perteneció a un sindicato.</FormLabel>
          <RadioGroup
            row
            aria-label="Perteneció a un sindicato"
            name="hasUnionSindicate"
            value={values.hasUnionSindicate}
            onChange={handleInputChange}
          >
            <FormControlLabel value="Si" control={<Radio />} label="Si" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl> */}
      </Grid>
    </Grid>
  );
}
