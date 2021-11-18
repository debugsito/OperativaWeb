import React from 'react'
import { Button, Dialog, Typography, TextInput } from "../../../shared/components";
import { Grid, makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

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
            maxWidth="md"
            dialogTitle="Bandeja de mensajes"
            {...props}
        >
            <DialogContent dividers>
                <div className={classes.containerForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="justify-end">
                            <Button variant="outlined" size="large">CONTACTAR</Button>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
        </Dialog>
    )
}
