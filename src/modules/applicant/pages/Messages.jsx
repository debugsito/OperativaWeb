import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    // background: #f7f7f7;
    // padding: 1rem;
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    spanText: {
        fontWeight: 'bold',
        fontSize: '1.5em'
    }

}));



const Messages = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id } = useParams();
    const initRoute = SessionRoutes().initRoute;

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {

    };

    const setBefore = () => {
        history.push(`${initRoute}/postulaciones/detalle/${publication_account_id}`);
    };

    return (
        <>
            <Container className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className="mb-2">
                        <a className="btn-logout">
                            <NavigateBefore onClick={setBefore} />
                        </a>
                    </Grid>
                    <Grid item xs={12} className="mb-2">
                        <div className="container-result-postulate-form">
                            <Grid item xs={12} className="mb-2">
                                <div className="container-header">
                                    <h4 className="title">Bandeja de Mensajes</h4>
                                    {/* <Button variant="contained" color="secondary" size="large"
                                            onClick={handleOpen}>
                                        
                                    </Button> */}
                                </div>
                            </Grid>
                            
                        </div>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}