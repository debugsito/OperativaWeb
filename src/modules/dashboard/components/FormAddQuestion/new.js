import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Button, Typography } from "../../../shared/components";
import FormController from "../../../shared/formControllers";
import DeleteIcon from "@material-ui/icons/Delete";
import Options from "./Options";

const New = ({ control, name, setNotification, notification }) => {
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name,
  });
  const values = useWatch({ name, control });
  const validate = (index) => {
    return values.every((x) => x.question !== "" && x.type_question !== "");
  };
  return (
    <>
      {fields.map((item, index) => (
        <Grid container key={item.id} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Pregunta {index + 1}</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormController
              //   key={item.id}
              type="input"
              name={`${name}.${index}.question`}
              control={control}
              variant="outlined"
              label="Ingresa pregunta"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormController
              type="select"
              name={`${name}.${index}.type_question`}
              label="Tipo de respuesta"
              control={control}
              items={[
                {
                  value: "answer-open",
                  label: "Respuesta Abierta",
                },
                {
                  value: "answer-closed",
                  label: "Respuesta Cerrada",
                },
                {
                  value: "answer-multiple",
                  label: "Con varias opciones",
                },
              ]}
              margin="normal"
            />
          </Grid>
          {fields.length > 1 && (
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => remove(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={8}>
            {values[index]?.type_question === "answer-multiple" && (
              <Options
                nestedIndex={index}
                control={control}
                name={name}
                notification={notification}
                setNotification={setNotification}
              />
            )}
          </Grid>
        </Grid>
      ))}
      <Grid item xs={3}>
        <Button
          color="secondary"
          size="large"
          onClick={() => {
            if (validate(values)) {
              append({
                question: "",
                type_question: "",
                options: [
                  {
                    answer: "",
                    correct: false,
                  },
                ],
              });
            } else {
              setNotification({
                ...notification,
                open: true,
                message: `Para agregar otra pregunta, rellene los campos`,
              });
            }
          }}
        >
          {"+ AÑADIR PREGUNTA"}
        </Button>
      </Grid>
    </>
  );
};

export default New;
