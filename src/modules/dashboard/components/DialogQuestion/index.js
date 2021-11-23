import React from 'react'
import { Button, Dialog, Typography } from "../../../shared/components";
import { Grid, makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles(theme => ({
    containerForm: {
        padding: "2rem",
    }
}))

export default function Index({ saveQuestion, onClose, ...props }) {
    const classes = useStyles();

    const handleClick = () => {
        saveQuestion()
    }

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="sm"
                dialogTitle="Preguntas adicionales"
                onClose={onClose}
                {...props}
            >
                <DialogContent dividers>
                    <div className={classes.containerForm}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">Antes de continuar asignando evaluaciones</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" align="center">¿Quieres agregar preguntas adiciones? para conocer más sobre el postulante</Typography>
                            </Grid>
                            <Grid item xs={12} className="justify-center">
                                <Button variant="outlined" size="large" onClick={onClose}>NO</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="contained" size="large" onClick={handleClick}>SI</Button>
                            </Grid>

                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
