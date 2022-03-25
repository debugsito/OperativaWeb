import React from "react";
import { FormGroup, Grid } from "@material-ui/core";
import { Checkbox } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputRubro({ values, handleInputChange }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormGroup>
          <FormController
            type="checkbox"
            label="Produccion y Operaciones"
            name="rubro.answers.rubro_production.active"
          />
          <FormController
            type="checkbox"
            label="Mantenimiento y Limpieza"
            name="rubro.answers.rubro_maintenance.active"
          />
          <FormController
            type="checkbox"
            label="Call center y Ventas"
            name="rubro.answers.rubro_call_center.active"
          />
          <FormController
            type="checkbox"
            label="Motorizados y Courier"
            name="rubro.answers.rubro_motorizados.active"
          />
          <FormController
            type="checkbox"
            label="Construccion y Obras"
            name="rubro.answers.rubro_construction.active"
          />
          <FormController
            type="checkbox"
            label="Almacén y transporte"
            name="rubro.answers.rubro_almacen.active"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
