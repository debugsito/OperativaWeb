import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Button, CircularProgressWithLabel, Container, Paper, Typography, TextCustom } from "../../shared/components";
import { CardsFeatures } from "../components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { setPublicationId, setStatus } from '../../../store/actions/dashboard/dashboard.action';
import { GirlImage, JobCreatedIcon } from "../images";

const useStyles = makeStyles(theme => ({
    image:{
        width: "80%",
    }
}))

export default function JobPositionCreatedPage() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [progress, setProgress] = useState(0);
    const initRoute = SessionRoutes().initRoute;
    const {job_position} = useSelector(state => state.dashboard)

    useEffect(() => {
        let counter = 0
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 101 ? 0 : prevProgress + 10));
          if(counter === 100){
            clearInterval(timer);
          }
          counter+=10
        }, 1000);
        return () => {
          clearInterval(timer);
          dispatch(setPublicationId(null))
          dispatch(setStatus("idle"))
        };
      }, []);

      const goListOfApplicants = () => {
          history.push(`${initRoute}/publicacion/${job_position.id}/lista-de-postulantes`)
      }

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={5}>
                                <Grid container spacing={3}>
                                    { progress <= 101? 
                                        <>
                                            <Grid item xs={12}>
                                                <CircularProgressWithLabel value={progress}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h4">Tu publicación fue registrada con éxito</Typography>
                                            </Grid>        
                                            <Grid item xs={12}>
                                                <Typography variant="body2">En este momento la Inteligencia Artificial de Operativa está seleccionando entre miles de postulante con tus requerimientos.</Typography>
                                            </Grid>
                                        </>
                                        :
                                        <>
                                            <Grid item xs={6}>
                                               <img src={JobCreatedIcon} alt="success"/>
                                            </Grid>    
                                            <Grid item xs={12}>
                                                <Typography variant="h4">Encontramos <TextCustom color="primary" weight={700}>40 postulantes</TextCustom> que cumplen con tus requerimientos</Typography>
                                            </Grid>    
                                            <Grid item xs={12}>
                                                <Button variant="contained" size="large" onClick={goListOfApplicants}>Ver resultados</Button>
                                            </Grid>    
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7} className="justify-end">
                                <img src={GirlImage} alt="trabajo remoto" className={classes.image}/>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Typography variant="h6">Mira las funciones adicionales teniendo una <TextCustom color="primary" weight={700}>Cuenta Premium</TextCustom></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <CardsFeatures />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" size="large">PÁSATE A PREMIUM</Button>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
