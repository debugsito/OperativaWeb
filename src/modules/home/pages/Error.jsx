import React from 'react'
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { errorImg } from "../images2";
import { Button  } from "../../shared/components";

const useStyles = makeStyles(theme => ({
    img:{
        textAlign:'center',
        [theme.breakpoints.down('sm')]: {
            width:'300px',
        },
        [theme.breakpoints.up('md')]: {
            width:'500px',
        },
    },
    textError:{
        color:'var(--principalColor)',
        fontWeight:'600',
        [theme.breakpoints.down('sm')]: {
            fontSize:'3rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize:'4rem',
            margin:'1rem 0 0.5rem 0'
        },
    }
}))

export default function Error() {
    const classes = useStyles();
    const history = useHistory();
    const initRoute = SessionRoutes().initRoute;

    const handleRedirect = () => {
        history.push(initRoute)
    }

    return (
        <Grid container justify="center" >
            <Grid item xs={12} md={8} >
                <Grid container spacing={2} justify="center" direction="column" alignItems="center">
                    <Grid item xs={10}>   
                        <h1 className={classes.textError}>Error 404</h1>
                    </Grid>
                    <Grid item xs={10}>
                        <img src={errorImg} className={classes.img}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography component="h3" >
                            Esta página no está disponible.
                            Es posible que el enlace esté roto o que se haya eliminado la página. 
                            Verifica que el enlace que quieres abrir es correcto.
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button fullWidth variant="contained" size="large" onClick={handleRedirect} >Volver a Home</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
