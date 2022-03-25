import React, { useState, useContext } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

import { Button, Dialog, Typography, TextInput } from "../../../shared/components";
import { Grid, makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogMessageSent } from "../";
import { useForm } from "../../../hooks";

//services
import { service_Dashboard } from "../../../../store/services";
//Context
import { ContextNotification } from "../../context/NotificationAlertContext";
//Constans
import { messageError } from "../../utils/notification";

const initialValues = {
    subject: "",
    body: "",
};

const dafaultValues = {
    subject: "Gracias por postular",
    body: `Hola Postulante,
 
Nuestro departamento de Recursos Humanos te agradece  por habernos permitido contar con tu participación en el proceso de selección, estamos conscientes del valioso espacio de tiempo que nos has brindado para poder conocerte y comprender tus intereses y aspiraciones. Lamentablemente en esta oportunidad no podrás ser considerada para la siguiente etapa.
    
Te agradecemos por haber participado en el proceso, deseándote muchos éxitos en el desarrollo de tus actividades.
     
Saludos,
    
La empresa`,
};

const useStyles = makeStyles(theme => ({
    containerForm: {
        padding: "2rem",
    }
}))

export default function Index({ fill = false, ...props }) {
    const maxLength = 650;
    const classes = useStyles();
    const [openModalSuccess, setOpenModalSuccess] = useState(false)
    const { postulantsSelected } = useSelector(state => state?.dashboard)
    const { notification, setNotification } = useContext(ContextNotification);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('subject' in fieldValues)
            temp.subject = fieldValues.subject ? "" : "El campo es requerido."
        if ('body' in fieldValues)
            temp.body = fieldValues.body ? (fieldValues.body.length < maxLength ? "" : "El campo tiene mucho texto") : "El campo es requerido."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    
    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(fill ? dafaultValues : initialValues, true, validate);

    const handleSendMessage = () => {
        let promises = []
        postulantsSelected.forEach(item => {
            promises.push(service_Dashboard.sendMessage({publication_account_id:item},values))
        })
        axios.all(promises).then(axios.spread((...responses) => {
            props.onClose()
            setOpenModalSuccess(true)
        }))
        .catch(error => {
            setNotification({ ...notification, ...messageError() });
        })
    }

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="md"
                dialogTitle="Enviar mensaje personalizado"
                {...props}
            >
                <DialogContent dividers>
                    <div className={classes.containerForm}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextInput
                                    fullWidth
                                    name="subject"
                                    label="Asunto"
                                    value={values.subject}
                                    onChange={handleInputChange}
                                    error={errors.subject ? true : false}
                                    helperText={errors.subject}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextInput
                                            fullWidth
                                            name="body"
                                            label="Escribre un mensaje"
                                            multiline
                                            rows={8}
                                            value={values.body}
                                            onChange={handleInputChange}
                                            error={errors.body ? true : false}
                                            helperText={errors.body}
                                        />
                                        <Grid item xs={12} className="justify-end">
                                            <Typography variant="caption">{`${values.body.length}/${maxLength} caracteres`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="justify-end">
                                <Button variant="outlined" size="large" onClick={props.onClose}>CANCELAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="contained" size="large" disabled={disabledButtonState} onClick={handleSendMessage}>ENVIAR</Button>
                            </Grid>

                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
            <DialogMessageSent open={openModalSuccess} onClose={() => setOpenModalSuccess(false)} />
        </>
    )
}
