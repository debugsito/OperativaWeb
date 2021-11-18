import React from 'react'
import { Button, Dialog, Typography, TextInput } from "../../../shared/components";
import { Grid, makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { useForm } from "../../../hooks";

const initialValues = {
    subject: "",
    message: "",
};

const useStyles = makeStyles(theme => ({
    containerForm: {
        padding: "2rem",
    }
}))

export default function Index({ ...props }) {
    const classes = useStyles();
    const maxLength = 650;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('subject' in fieldValues)
            temp.subject = fieldValues.subject ? "" : "El campo es requerido."
        if ('message' in fieldValues)
            temp.message = fieldValues.message ? (fieldValues.message.length < maxLength ? "" : "El campo tiene mucho texto") : "El campo es requerido."

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
    } = useForm(initialValues, true, validate);

    return (
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
                                        name="message"
                                        label="Escribre un mensaje"
                                        multiline
                                        rows={4}
                                        value={values.message}
                                        onChange={handleInputChange}
                                        error={errors.message ? true : false}
                                        helperText={errors.message}
                                    />
                                    <Grid item xs={12} className="justify-end">
                                        <Typography variant="caption">{`${values.message.length}/${maxLength} caracteres`}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="justify-end">
                            <Button variant="outlined" size="large">CANCELAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button variant="contained" size="large" disabled={disabledButtonState}>ENVIAR</Button>
                        </Grid>

                    </Grid>
                </div>
            </DialogContent>
        </Dialog>
    )
}
