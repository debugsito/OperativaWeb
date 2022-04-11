import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";
import '../styles/postulate-form.css';
import { useParams } from "react-router-dom";
import { service_Applicant } from "../../../store/services";
import { arrow } from '../../shared/images/postulant/index'
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
        paddingBottom: '5rem'
    }
}));


const ApplicantPublicationDetail = () => {
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { publication_account_id, back } = useParams();
    const [data, setData] = React.useState({});

    useEffect(() => {
        getAnuncio();
    }, []);

    const getAnuncio = async () => {
        const response = await service_Applicant.getApplicantPublicationById(publication_account_id);
        let pub = response.data.data.publication;
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
        if (back == 1) {
            history.push(`${initRoute}/postulaciones/detalle/${publication_account_id}`)
        }
        if (back == 2) {
            history.push(`${initRoute}/postulaciones/1`)
        }
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
        </>
    );
};
export default ApplicantPublicationDetail;
