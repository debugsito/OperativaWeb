import React, { useState } from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { Button, TextInput, Typography, LinkRouter } from "../../../shared/components";

import { FbIcon, InIcon, TwIcon, MailIcon } from "../../images";

const REDES_SOCIALES = [
    { icon: FbIcon, text: "Facebook" }, { icon: InIcon, text: "Linkedin" }, { icon: TwIcon, text: "Twitter" }, { icon: MailIcon, text: "Correo" }
]

const useStyles = makeStyles(theme => ({
    container: {
        padding: "3rem",
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
    },
    cleanLink: {
        textDecoration: 'none',
        color: "inherit"
    }
}))

export default function FormRedes(props) {
    const classes = useStyles()
    const [value] = useState({
        url:"https://www.verificativa.com/blog/salario-emocional-5-claves-para-fidelizar-al-talento",
        title: "Vacante disponible"
    })

    const twitterEncoder = encoder(`${value.title} ${value.url}`)

    function encoder(text) {
        return encodeURIComponent(text)
    }

    return (
        <div className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Compartir por</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.containerRedes}>
                        <a href={`http://www.facebook.com/sharer/sharer.php?u=${value.url}`} target="_blank" rel="noopener noreferrer" className={classes.cleanLink}>
                            <div className={classes.redSocial}>
                                <img src={FbIcon} alt="Facebook" className={classes.icon} />
                                <Typography variant="body1">Facebook</Typography>
                            </div>
                        </a>
                        <a href={`http://twitter.com/intent/tweet?text=${twitterEncoder}`} target="_blank" rel="noopener noreferrer" className={classes.cleanLink}>
                            <div className={classes.redSocial}>
                                <img src={TwIcon} alt="Twitter" className={classes.icon} />
                                <Typography variant="body1">Twitter</Typography>
                            </div>
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${value.url}&title=${value.title}`} target="_blank" rel="noopener noreferrer" className={classes.cleanLink}>
                            <div className={classes.redSocial}>
                                <img src={InIcon} alt="Linkedin" className={classes.icon} />
                                <Typography variant="body1">Linkedin</Typography>
                            </div>
                        </a>
                        <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=someone@gmail.com&su=${value.title}&body=${value.url}`} target="_blank" rel="noopener noreferrer" className={classes.cleanLink}>
                            <div className={classes.redSocial}>
                                <img src={MailIcon} alt="Correo" className={classes.icon} />
                                <Typography variant="body1">Correo</Typography>
                            </div>
                        </a>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Obtener enlace</Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextInput
                        fullWidth
                        name="enlace"
                        value={value.url}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" size="large">COPIAR LINK</Button>
                </Grid>

            </Grid>
        </div>
    )
}
