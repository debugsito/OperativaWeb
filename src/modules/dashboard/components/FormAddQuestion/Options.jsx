import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import {
  Controller,
  useController,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { Button, Typography } from "../../../shared/components";
import FormController from "../../../shared/formControllers";
import DeleteIcon from "@material-ui/icons/Delete";

const Options = ({
  control,
  nestedIndex,
  name,
  notification,
  setNotification,
}) => {
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: `${name}[${nestedIndex}].options`,
  });

  const { setValue, watch } = useFormContext();
  const options = watch(`${name}[${nestedIndex}].options`);
  const validate = () => {
    return options.length < 5;
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item container spacing={3} xs={10}>
            <Grid item xs={10}>
              Alternativas
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2">Respuesta</Typography>
            </Grid>
          </Grid>
          {fields.map((item, index) => (
            <Grid container spacing={3} key={item.id}>
              <Grid item container spacing={3} xs={10}>
                <Grid item xs={10}>
                  <FormController
                    type="input"
                    name={`${name}.${nestedIndex}.options.${index}.answer`}
                    control={control}
                    label={`Opción ${index + 1}`}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormController
                    type="radio"
                    name={`${name}.${nestedIndex}.options.${index}.correct`}
                    control={control}
                    customOnChange={(val) => {
                      for (let i = 0; i < fields.length; i++) {
                        if (i !== index) {
                          setValue(
                            `${name}.${nestedIndex}.options.${i}.correct`,
                            false
                          );
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>
              {fields.length > 2 && (
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
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={3} direction="row-reverse">
        <Grid item xs={3}>
          <Button
            color="secondary"
            size="large"
            onClick={() => {
              validate()
                ? append({
                    answer: "",
                    correct: false,
                  })
                : setNotification({
                    ...notification,
                    open: true,
                    message: "No se puede agregar más alternativas",
                  });
            }}
          >
            {"+ AÑADIR RESPUESTA"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Options;
