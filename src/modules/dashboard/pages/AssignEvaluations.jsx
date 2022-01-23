import React, { useState } from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { TabsAssignEvaluations } from "../components";
import { Breadcrumbs, Container, Typography, TitlePage, VideoPlayer } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

//Images, icons
import { PreviewImageYtImg } from "../images";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 0,
    },
    video: {
        boxShadow: "0px 4px 14px rgba(208, 212, 223, 0.5)",
        borderRadius: "10px",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem"
    },
    previewVideoButton: {
        cursor: "pointer"
    }
}))

export default function AssignEvaluations() {
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Postulantes", to: `${initRoute}/publicacion/:publication_id/lista-de-postulantes` }];
    const [openVideo, setOpenVideo] = useState(false)

    const handleOpenVideo = () => {
        setOpenVideo(true)
    }

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={9}>
                            <TitlePage
                                description="A continuacion, asignar evaluaciones a tus postulantes"
                                handleClick={() => history.goBack()}
                            >
                                Motorizados
                            </TitlePage>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.video}>
                                <Typography variant="subtitle">VER VIDEO EXPLICATIVO</Typography>
                                <div className={classes.previewVideoButton} onClick={handleOpenVideo}>
                                    <img src={PreviewImageYtImg} alt="preview" />
                                </div>
                            </div>
                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TabsAssignEvaluations />
                </Grid>
            </Grid>
            <VideoPlayer openVideo={openVideo} onClose={() => setOpenVideo(false)} url="https://www.youtube.com/watch?v=E6JTH9Q40A8" />
        </Container>
    )
}
