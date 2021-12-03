import React, { useState } from 'react'
import { Button, Dialog, Typography, TextInput } from "../../../shared/components";
import { Grid, makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { useForm } from "../../../hooks";

const useStyles = makeStyles(theme => ({
    containerForm: {
        padding: "2rem",
    }
}))



export default function Index({ data, ...props }) {
    const classes = useStyles();
    console.log("data",data)

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="md"
                dialogTitle="Mensaje"
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
                                    value={data.subject}
                                    inputProps={{
                                        readOnly: true,
                                    }}
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
                                            rows={8}
                                            value={data.message}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="justify-end">
                                <Button variant="contained" size="large" onClick={props.onClose}>CERRAR</Button>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
