import React, { useContext } from "react";
// import { useForm } from "../../../hooks";
import { makeStyles } from "@material-ui/styles";
import { Button } from "../../../shared/components";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import InputResidence from "./InputResidence";
import InputTransport from "./InputTransport";
import InputExperience from "./InputExperience";
import InputRubro from "./InputRubro";
import InputLabor from "./InputLabor";
import InputEconomy from "./InputEconomy";
import InputSalaryExpectations from "./InputSalaryExpectations";
import InputEducation from "./InputEducation";
import InputAge from "./InputAge";
import InputGender from "./InputGender";
import InputQuestionAditional from "./InputQuestionAditional";
import InputFamily from "./InputFamily";
import InputHealth from "./InputHealth";
import InputPersonal from "./InputPersonal";
import {
  useForm,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { Context, defaultValues } from "../../context/AdvanceFilterContext";
import { buildQueryParams } from "../../utils/convert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    color: "#5D5FEF",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
  },
  controls: {
    padding: "1.5rem",
    display: "flex",
    justifyContent: "space-around",
  },
}));


const initialValues = {
  department_id: "",
  province_id: "",
  district_id: "",
  hasTransport: "",
};

export default function AccordionFilter({ apply }) {
  const classes = useStyles();
  const { values, resetItem, setValues, queryParams, setQueryParams } = useContext(Context);
  const methods = useForm({ mode: "onSubmit", defaultValues: values });
  const { dirtyFields } = useFormState({
    control: methods.control,
  });

  const resetForm = () => {
    setValues(defaultValues);
  };

  const onSubmit = (data) => {
    let newValue = { ...values };
    let newData = { ...data };
    console.log("dirtyFields", dirtyFields)
    console.log("data formik", data)
    if (dirtyFields.residence && newValue.residence) {
      console.log("values", newValue)
      if (data?.residence?.answers.length) {
        newData.residence.answers = [
          ...newValue.residence.answers,
          ...data.residence.answers,
        ]
      }
      console.log("newData",newData) 
      // else {
      //   resetItem("residence");
      // }
    }
    // if (dirtyFields.transport) {
    //   if (data?.transport?.has_transport) {
    //     newValue.transport = {
    //       ...data.transport,
    //       active: true,
    //     };
    //   } else {
    //     resetItem("transport");
    //   }
    // }
    // Object.keys(data).forEach((item) => {
    //   if (item !== "residence" && item !== "transport") {
    //     if (dirtyFields[item]) {
    //       const valid = Object.values(data[item].answers).some(
    //         (value) => value.active
    //       );
    //       console.log("valid",valid)
    //       if (valid) {
    //         newValue[item] = {
    //           ...data[item],
    //           active: true,
    //         };
    //       } else {
    //         resetItem(item);
    //       }
    //     }
    //   }
    // });

    apply();
    setValues(newData);
    updateQueryParams(data)
  };

  const updateQueryParams = (newValue) => {
    const newQueryParams = buildQueryParams(newValue)
    setQueryParams(prevState => ({ ...prevState, ...newQueryParams }))
  }


  const valuesForm = methods.watch();
  return (
    <div className={classes.root}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Lugar de residencia
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputResidence />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Transporte</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputTransport />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Experiencia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputExperience />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Rubro de interés
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputRubro />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Laboral</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputLabor
              // values={values}
              // handleInputChange={handleInputChange}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Economía</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputEconomy />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Expectativa salarial
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputSalaryExpectations />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Educación</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputEducation />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Edad</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputAge />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Género</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputGender />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Preguntas adicionales
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputQuestionAditional />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Familia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputFamily />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Salud</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputHealth />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Personal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputPersonal />
            </AccordionDetails>
          </Accordion>
          <div className={classes.controls}>
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              onClick={resetForm}
            >
              LIMPIAR
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              type="submit"
              onClick={onSubmit}
            >
              APLICAR
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
