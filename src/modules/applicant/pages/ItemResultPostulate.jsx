import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";
import { Button } from "../../shared/components";
import '../styles/postulate-form.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { service_Applicant } from "../../../store/services";
import { useSelector, useDispatch } from "react-redux";
import { getAccount } from '../../../store/actions/auth/auth.middleware'
import { arrow } from '../../shared/images/postulant/index'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CheckSvg from "../assets/images/check.svg"

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
    const dispatch = useDispatch();
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
        let pub = response.data.publication;
        if (pub) {
            pub.description = isJsonString(pub?.description) ? JSON.parse(pub?.description) : pub.description;
            pub.description_text = (Array.isArray(pub.description) ? pub.description[0].children[0].text : '');
            pub.requirements = isJsonString(pub?.requirements) ? JSON.parse(pub?.requirements) : pub?.requirements;
            console.log(pub);
            setData(pub);
        }
    };

    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const setBefore = () => {
        history.push(`${initRoute}/formulario-postular/info`)
    };

    const handleOpen = async () => {
        const response = await service_Applicant.sendApplication(id);
        if (response.status == 200) {
            dispatch(getAccount())
        }
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
                        <img src={arrow} alt="" onClick={setBefore} />
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
                                    <p>{data?.rubro?.name}</p>
                                </div>
                                <div>
                                    <p><b>Descripción</b></p>
                                    <p>
                                        {data.description_text}
                                        <br />
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
                // maxWidth="xs"
            >
                <MuiDialogContent>
                    <Grid container spacing={0} justifyContent="center">
                        
                            <Grid item xs={12} style={{ textAlign: 'center', padding:'2px' }}>
                                <img src={CheckSvg} alt="check"
                                width="83" heigth="86"
                                ></img>
                                <CardHeader style={{ textAlign: 'center' }} title={
                                    <React.Fragment>
                                        <Typography
                                            variant="h6"
                                            component="h6"
                                            color="textPrimary"
                                        >
                                            Postulación Enviada
                                        </Typography>
                                    </React.Fragment>
                                } />

                                <CardContent style={{ textAlign: 'center' }}>
                                    <Grid item xs={12} >
                                        <Typography variant="body2" color="textSecondary" component="p">

                                           Tu mensaje fue enviado con éxio al reclutador
                                        </Typography>

                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid item xs={12}>
                                        <Grid container spacing={0} direction='row' justifyContent="center">
                                            <Button variant="contained" size="large" onClick={handleClose}>Cerrar</Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Grid>
                      
                    </Grid>
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
