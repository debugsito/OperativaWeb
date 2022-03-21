import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Grid, makeStyles } from "@material-ui/core";
import { Button, Typography } from "../../../shared/components";
import { FormAddQuestion, DialogQuestion } from "../";
import NewFormAddQuestion from "../FormAddQuestion/new";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

//Constant
import { QUESTION_TYPE, FIELD_TYPE, FORM_TYPE } from "../../constants/Dashboard";
//Services
import { service_Dashboard } from "../../../../store/services";
//Context
import { ContextNotification } from "../../context/NotificationAlertContext";
//Constans
import { messageSuccessful, messageError } from "../../utils/notification";

const useStyles = makeStyles((theme) => ({
  form: {
    background: "#fff",
    padding: "3rem",
    marginBottom: "2rem",
  },
  sectionInfo: {
    background: "#F5F7F9",
    padding: "2rem",
  },
  buttons: {
    marginTop: "1rem",
    width: "100%",
  },
}));

const initialValues = [
  {
    question: "",
    type_question: "",
    options: [
      {
        answer: "",
        correct: false,
      },
      {
        answer: "",
        correct: false,
      },
    ],
  },
];
const validationSchema = Yup.object().shape({
  evaluation: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Este campo es requerido"),
      type_question: Yup.string().required("Este campo es requerido"),
      options: Yup.array().of(
        Yup.object().shape({
          answer: Yup.string().required("Este campo es requerido"),
          correct: Yup.boolean(),
        })
      ),
    })
  ),
  extra: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Este campo es requerido"),
      type_question: Yup.string().required("Este campo es requerido"),
      options: Yup.array().of(
        Yup.object().shape({
          answer: Yup.string().required("Este campo es requerido"),
          correct: Yup.boolean(),
        })
      ),
    })
  ),
});

export default function TabEvaluation({ nextTab }) {
  const { publication_id } = useParams();
  const { postulantsSelected } = useSelector(state => state?.dashboard)
  const { notification, setNotification } = useContext(ContextNotification);
  const classes = useStyles();
  const [showInfo, setShowInfo] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [fields, setFields] = useState(initialValues);
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      evaluation: initialValues,
      extra: initialValues,
    },
    resolver: yupResolver(validationSchema),
  });

  // useEffect(() => {
  //   const index = values.length - 1;
  //   if (values[index].type_question === "answer-multiple") {
  //     console.log("eleji pregunta multiple");
  //   }
  // }, [values]);

  const saveQuestions = () => {
    setValues(initialValues);
    setFields(initialValues);
    setOpenModal(false);
  };

  const cleanForm = () => {
    formMethods.reset()
  };

  // const validate = async() => {
  //   const evaluationTemp = formMethods.getValues("evaluation");
  //   const extraTemp = formMethods.getValues("extra");
  // }

  // const validate = (array) => {
  //   let result;
  //   array.map((item) => {
  //     result = Object.values(item).every((x) => x != "");
  //     if (!result) return;
  //   });
  //   return result;
  // };
  const onSubmit = async (data) => {
    const body_evaluation = {
      name: "Preguntas",
      type_form: FORM_TYPE.evaluation,
      questions: buildBodyOfQuestion(data.evaluation)
    }
    const body_extra = {
      name: "Preguntas",
      type_form: FORM_TYPE.question_aditional,
      questions: buildBodyOfQuestion(data.extra)
    }
    const body_main = {
      body_evaluation,
      body_extra
    }
    let promises = [];
    let array_assign = [];
    for (const key in body_main) {
      const body = body_main[key];
      promises.push(service_Dashboard.saveFormQuestion(body))
    }
    axios.all(promises).then(axios.spread((...responses) => {
      responses.forEach(res => {
        postulantsSelected.data.forEach(item => {
          const body = {
            form_id:res.data.id,
            publication_id,
            account_id:item.user.account_id
          }
          array_assign.push(body)
        })
      })
      return service_Dashboard.assignFormAPostulant(array_assign)
    }))
    .then(resp => {
      setNotification({ ...notification, ...messageSuccessful() })
      nextTab()
    })
    .catch(error => {
      setNotification({ ...notification, ...messageError() });
    })
  };

  function buildBodyOfQuestion(array) {
    let bodyQuestion = {};
    let question = [];
    let options = [];
    array.forEach(item => {
      item.options.forEach(option => {
        options.push(
          {
            text: option.answer,
            field_type_id: item.type_question == "answer-closed" ? FIELD_TYPE.radiobutton : FIELD_TYPE.text
          })
      })
      bodyQuestion.question_type_id = item.type_question == "answer-closed" ? QUESTION_TYPE.closed : QUESTION_TYPE.open;
      bodyQuestion.text = item.question;
      bodyQuestion.question_fields = options
      question.push(bodyQuestion)
      options = []
      bodyQuestion = {}
    })
    return question
  }
  return (
    <div>
      {showInfo && (
        <div className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Realiza una evaluación técnica a tu postulante
              </Typography>
            </Grid>
            <section className={classes.sectionInfo}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Formula una lista de preguntas, estas pueden ser:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    <li>
                      <b>Pregunta abierta:</b> El postulante deberá fundamentar
                      su respuesta
                    </li>
                    <li>
                      <b>Pregunta cerrada:</b> El postulante tendrán que elgir
                      solo una opción
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Si tienes las preguntas cerradas y respuestas en un
                    documento de Excel o CVS, podrás cargar tu documento en la
                    opción <b>IMPORTAR</b>, la correción se realiza
                    automáticamente.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setShowInfo(false)}
                  >
                    ME QUEDA CLARO
                  </Button>
                </Grid>
              </Grid>
            </section>
          </Grid>
        </div>
      )}
      {!showInfo && (
        <FormProvider {...formMethods}>
          <form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">
                  Crea un formulario para la <strong>Evaluación de experiencia</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <NewFormAddQuestion
                    control={formMethods.control}
                    name="evaluation"
                    setNotification={setNotification}
                    notification={notification}
                    errors={formMethods.formState.errors}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
          <div className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">
                  Crea un formulario para <strong>Preguntas adicionales</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <NewFormAddQuestion
                    control={formMethods.control}
                    name="extra"
                    setNotification={setNotification}
                    notification={notification}
                    errors={formMethods.formState.errors}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={classes.buttons}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button variant="outlined" size="large" onClick={cleanForm}>
                  Limpiar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size="large" onClick={formMethods.handleSubmit(onSubmit)}>
                  Guardar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" size="large" onClick={nextTab}>
                  Continuar
                </Button>
              </Grid>
            </Grid>
          </div>
        </FormProvider>
      )}
      <DialogQuestion
        open={openModal}
        onClose={() => setOpenModal(false)}
        saveQuestion={saveQuestions}
        length={values.length}
      />
    </div>
  );
}
