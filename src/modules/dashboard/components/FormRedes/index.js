import React, { useState,useEffect } from 'react'
import { useSelector } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import { Button, TextInput, Typography, LinkRouter } from "../../../shared/components";
import { service_Applicant } from "../../../../store/services";

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
    const { job_position } = useSelector(state => state.dashboard)
    const [value,setValue] = useState({
        url:"https://www.verificativa.com/blog/salario-emocional-5-claves-para-fidelizar-al-talento",
        title: "Vacante disponible"
    })
    const [twitterEncoder,setTwitterEncoder] = useState('')

    function encoder(text) {
        return encodeURIComponent(text)
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(value.url)
    }

    useEffect(async () => {
        if(job_position?.id){
            const response = await service_Applicant.detallePublicacion(job_position?.id)
            let pub = response.data.publication
            if(pub) {
                let url = window.location.protocol + "//" + window.location.host+"/publication/"+pub?.title_key
                // let url = 'https://www.operativa.pe/'+pub?.title_key
                let title = "Vacante disponible"
                setValue({
                    url : url,
                    title: title
                })
                setTwitterEncoder(encoder(`${value.title} ${value.url}`))
            }
        }

    },[job_position]);

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
                    <Button variant="contained" size="large" onClick={handleCopy}>COPIAR LINK</Button>
                </Grid>

            </Grid>
        </div>
    )
}
