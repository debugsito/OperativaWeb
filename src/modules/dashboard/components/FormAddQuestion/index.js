import React, { useState } from "react";
import { MenuItem, IconButton, Grid } from "@material-ui/core";
import { TextInput, Select, Typography } from "../../../shared/components";

import DeleteIcon from "@material-ui/icons/Delete";

export default function Index({
  handleChange,
  values,
  index,
  length,
  deletedValues,
}) {
  const [options, setOptions] = useState([]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Pregunta {index + 1}</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextInput
          fullWidth
          name="question"
          label="Ingresa pregunta"
          value={values.question}
          onChange={(e) => handleChange(e, index)}
          // error={errors.question ? true : false}
          // helperText={errors.question}
        />
        {values.type_question === "answer-multiple" && (
          <>
            <TextInput
              fullWidth
              label="Opcion"
              name="options"
              variant="standard"
            />
          </>
        )}
      </Grid>
      <Grid item xs={3}>
        <Select
          label="Tipo de respuesta"
          name="type_question"
          value={values.type_question}
          onChange={(e) => handleChange(e, index)}
          // error={errors.type_question ? true : false}
          // helperText={errors.type_question}
        >
          <MenuItem value="answer-open">Respuesta abierta</MenuItem>
          <MenuItem value="answer-close">Respuesta cerrada</MenuItem>
          <MenuItem value="answer-multiple">Con varias opciones</MenuItem>
          {/* <MenuItem value="importar">Importar</MenuItem> */}
        </Select>
      </Grid>
      {length > 1 && (
        <Grid item xs={1}>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deletedValues(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}
    </>
  );
}
