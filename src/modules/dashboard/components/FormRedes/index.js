import React from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { Button, TextInput, Typography } from "../../../shared/components";

import { FbIcon, InIcon, TwIcon, MailIcon } from "../../images";

const REDES_SOCIALES = [
    { icon: FbIcon, text: "Facebook" }, { icon: InIcon, text: "Linkedin" }, { icon: TwIcon, text: "Twitter" }, { icon: MailIcon, text: "Correo" }
]

const useStyles = makeStyles(theme => ({
    container: {
        padding: "1em",
    },
    containerRedes: {
        display: "flex",
        gridGap: "2.5rem"
    },
    redSocial: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    icon: {
        width: "48px",
        height: "48px",
    }
}))

export default function FormRedes(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Compartir por</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.containerRedes}>
                        {
                            REDES_SOCIALES.map((item, index) => (
                                <div key={index} className={classes.redSocial}>
                                    <img src={item.icon} alt={item.text} className={classes.icon} />
                                    <Typography variant="body1">{item.text}</Typography>
                                </div>
                            ))
                        }
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Obtener enlace</Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextInput
                        fullWidth
                        name="enlace"
                        value="https://operativa.aviso/boards/845443390/pulses/1392544747P"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" size="large">COPIAR LINK</Button>
                </Grid>

            </Grid>
        </div>
    )
}
