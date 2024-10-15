import React, { useState } from 'react'
import { Button, Dialog, Typography } from "../../../shared/components";
import { Grid, makeStyles, MenuItem } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

//Images, icons
import { MessageSentIcon } from "../../images";

const useStyles = makeStyles(theme => ({
    containerForm: {
        padding: "2rem",
    }
}))

export default function Index({ ...props }) {
    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            {...props}
        >
            <DialogContent dividers>
                <div className={classes.containerForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="justify-center">
                            <img src={MessageSentIcon} alt="icono" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">Mensaje enviado</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" align="center">Tu mensaje fue enviado con éxito, pronto tendrás noticias del postulante</Typography>
                        </Grid>
                        <Grid item xs={12} className="justify-center">
                            <Button variant="contained" onClick={props.onClose}>CERRAR</Button>
                        </Grid>
                    </Grid>

                </div>
            </DialogContent>
        </Dialog>
    )
}
