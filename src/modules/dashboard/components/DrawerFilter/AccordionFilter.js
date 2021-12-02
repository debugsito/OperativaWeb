import React from 'react'
import { useForm } from "../../../hooks";
import { makeStyles } from '@material-ui/styles'
import { Button } from "../../../shared/components";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        color: "#5D5FEF",
        fontSize: theme.typography.pxToRem(14),
        fontWeight: 700,
    },
    controls: {
        padding: "1.5rem",
        display: "flex",
        justifyContent: "space-around"
    },
}))

const initialValues = {
    department_id: "",
    province_id: "",
    district_id: "",
    hasTransport: ""
}



export default function AccordionFilter() {
    const classes = useStyles()

    const {
        values,
        setValues,
        handleInputChange,
    } = useForm(initialValues, false, false);


    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Lugar de residencia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InputResidence values={values} setValues={setValues} handleInputChange={handleInputChange} />
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
                    <InputTransport values={values} handleInputChange={handleInputChange} />
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
                    <InputExperience values={values} handleInputChange={handleInputChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Rubro de interés</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InputRubro values={values} handleInputChange={handleInputChange} />
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
                    <InputLabor values={values} handleInputChange={handleInputChange} />
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
                    <InputEconomy values={values} handleInputChange={handleInputChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Expectativa salarial</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InputSalaryExpectations values={values} handleInputChange={handleInputChange} />
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
                    <InputEducation values={values} handleInputChange={handleInputChange} />
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
                    <InputAge values={values} handleInputChange={handleInputChange} />
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
                    <InputGender values={values} handleInputChange={handleInputChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Preguntas adicionales</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InputQuestionAditional values={values} handleInputChange={handleInputChange} />
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
                    <InputFamily values={values} handleInputChange={handleInputChange} />
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
                    <InputHealth values={values} handleInputChange={handleInputChange} />
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
                    <InputPersonal values={values} handleInputChange={handleInputChange} />
                </AccordionDetails>
            </Accordion>
            <div className={classes.controls}>
                <Button size="large" variant="outlined" color="secondary">
                    LIMPIAR
                </Button>
                <Button size="large" variant="contained" color="secondary">
                    APLICAR
                </Button>
            </div>
        </div>
    )
}

