import {Container, Dialog, Grid, makeStyles, Typography} from "@material-ui/core";
import {NavigateBefore} from "@material-ui/icons";
import React, {useEffect} from "react";
import {SessionRoutes} from "../../shared/libs/sessionRoutes";
import {useHistory} from "react-router-dom";
import {Button} from "../../shared/components";
import '../styles/postulate-form.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {withStyles} from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import {service_Applicant} from "../../../store/services";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
    },
}));


const ItemResultPostulate = () => {
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    // console.log(this.props.match.param);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const { id } = useParams();
    const [data, setData] = React.useState({});

    useEffect(() => {
        getAnuncio();
    }, []);

    const getAnuncio = async () => {
        const response = await service_Applicant.detallePublicacion(id);
        setData(response.data.publication);
    };

    const setBefore = () => {
        history.push(`${initRoute}/formulario-postular`)
    };

    const handleOpen = async () => {
        const response = await service_Applicant.sendApplication(id);
        console.log(response);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Container className={classes.applicantContainer}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className="mb-2">
                        <a className="btn-logout">
                            <NavigateBefore onClick={setBefore}/>
                        </a>
                    </Grid>
                    <Grid item xs={12} className="mb-2">
                        <div className="container-result-postulate-form">
                            <Grid item xs={12} className="mb-2">
                                <div className="container-header">
                                    <h4 className="title">Detalles del aviso</h4>
                                    <Button variant="contained" color="secondary" size="large"
                                            onClick={handleOpen}>
                                        Postular
                                    </Button>
                                </div>
                            </Grid>
                            <div className="container-detail-aviso">
                                <p><b>{data.job_title}</b></p>
                                <div>
                                    <p><b>Categoría</b></p>
                                    <p>Logítica - Distribución</p>
                                </div>
                                <div>
                                    <p><b>Descripción</b></p>
                                    <p>
                                        Somos Pizza Hut, empresa americana con sede en Lima, San Miguel.
                                        Nos encontramos en la búsqueda de MOTORIZADOS.
                                        <br/>
                                        Vacante Disponible: REPARTIDORES TIEMPO COMPLETO.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>

            <Dialog onClose={handleClose} aria-labelledby="signin-dialog" open={open}
                    fullWidth
                    maxWidth="xs"
            >
                <MuiDialogContent dividers>
                    <Text variant="subtitle1">Postulación enviada</Text>
                    <p>Tu mensaje fue enviado con éxito al reclutador</p>
                    <div className="text-center">
                        <Button variant="contained" size="large" onClick={handleClose}>Cerrar</Button>
                    </div>
                </MuiDialogContent>
            </Dialog>
        </>
    );
};

const Text = withStyles((theme) => ({
    root: {
        margin: 2,
        cursor: "pointer"
    },
}))(Typography);

export default ItemResultPostulate;
