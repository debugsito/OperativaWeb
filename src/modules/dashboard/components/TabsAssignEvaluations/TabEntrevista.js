import React, { useState, useContext } from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { Button, Typography } from "../../../shared/components";
import { MedalInfo, TableInterviewSchedule } from "../";

//images
import { WarningIcon } from "../../images";
//Services
import { service_Dashboard } from "../../../../store/services";
//Context
import { ContextNotification } from "../../context/NotificationAlertContext";
//Utils
import { messageSuccessful, messageError } from "../../utils/notification";

const useStyles = makeStyles(theme => ({
    form: {
        background: "#fff",
        padding: "3rem",
    },
    sectionInfo: {
        background: "#F5F7F9",
        padding: "1.5rem",
        borderRadius: "10px",
        display: "flex",
        gap: "0.5rem"
    },
    buttons: {
        marginTop: "2rem"
    },

}))

export default function TabVerificativa({ nextTab, backTab }) {
    const classes = useStyles()
    const [interviews, setInterviews] = useState([]);
    const { notification, setNotification } = useContext(ContextNotification);

    const handleSaveInterviews = () => {
        service_Dashboard.saveFormInterview(interviews)
        .then(resp => {
            setNotification({ ...notification, ...messageSuccessful() })
        }).catch(err => {
            setNotification({ ...notification, ...messageError() });
        })
    }

    return (
        <div>
            <div className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="secondary">Evaluación</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <section className={classes.sectionInfo}>
                            <img src={WarningIcon} alt="icono" />
                            <Typography variant="body2">Recuerda que este paso es opcional al proceso.</Typography>
                        </section>
                    </Grid>
                    <Grid item xs={2} className="justify-center">
                        <MedalInfo text="Solo con" account="Premium" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">La entrevista será:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TableInterviewSchedule setInterviews={setInterviews} interviews={interviews}/>
                    </Grid>
                </Grid>
            </div>

            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={backTab}>REGRESAR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="large" onClick={handleSaveInterviews}>Guardar</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
