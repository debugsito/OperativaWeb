import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import ApplicantResultsPostulateForm from "../components/ApplicantPostulateForm/ApplicantResultsPostulateForm";
import { useParams } from "react-router-dom";
import { service_Applicant } from "../../../store/services";

const useStyles = makeStyles((theme) => ({
    // background: #f7f7f7;
    // padding: 1rem;
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    spanText : {
        fontWeight: 'bold',
        fontSize: '1.5em'
    }

}));

const ApplicationDetail = () => {
    const classes = useStyles();
    const history = useHistory()
    const { id } = useParams();
    const [data, setData] = React.useState({ publication: {} });
    const initRoute = SessionRoutes().initRoute;

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
            setData({ publication: pub });
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
        history.push(`${initRoute}/postulaciones`)
    };

    return (
        <Container className={classes.container}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <a className="btn-logout">
                        <NavigateBefore onClick={setBefore} />
                    </a>
                </Grid>
                <Grid item xs={12}>
                    <ApplicantResultsPostulateForm data={data} />
                    <h1> Felicitaciones ! </h1>
                    <p>Te encuentas en el proceso de selección, la empresa activará las tareas que deberás resolver. <br />
                    <br />
                        Te recomendamos que estés atento todo el proceso. <span className={classes.spanText}>¡Éxitos!</span> </p>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ApplicationDetail;
