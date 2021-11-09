import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";

import { Button, Breadcrumbs, Container, Modal } from '../../shared/components';
import { checkCircleIcon, closeIcon, registeredIcon } from "../images";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { service_Dashboard } from "../../../store/services";
import { getDistrictById, getGenderById } from "../../shared/utils";

const useStyles = makeStyles(theme => ({
    header:{
        padding:"1rem",
        position:"fixed",
        top:"4rem",
        backgroundColor:"#fff",
    },
    body:{
        padding:"1rem",
        marginTop:"10.5rem"
    },
    containerImgWithText:{
        display:"flex",
        '& img':{
            marginRight:"4px"
        }
    }
}))

const ApplicantProfile = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    let { postulant_id } = useParams()
    const initRoute = SessionRoutes().initRoute;
    const { applicantProfile, publicationSelected, postulantsByPublicationId } = useSelector(state => state.dashboard)
    const { districts } = useSelector(state => state.utils)

    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({ title: "", body: "", method: "" })
    const { id: publication_id } = publicationSelected.data; //publication_id => ID de la publicacion
    const routes = [
        { name: "Incio", to: `${initRoute}` },
        { name: "Postulantes", to: `${initRoute}/postulantes` },
        { name: "Perfil", to: `${initRoute}/postulante/perfil` }
    ];

    useEffect(() => {
        if(postulant_id) {
            dispatch(getProfileOfApplicant({ postulant_id }))
        }
    }, [postulant_id])

    const handleSaveOption = async (method) => {

        const { id: user_id } = applicantProfile?.user;
        let obj = {
            user_id
        }
        switch (method) {
            case 'select':
                await service_Dashboard.selectApplicant(obj, publication_id);
                break;
            case 'deny':
                await service_Dashboard.denyApplicant(obj, publication_id);
                break;
            case 'hire':
                await service_Dashboard.hireApplicant(obj, publication_id);
                break
            default:
                break;
        }
        setOpenModal(false);
        history.push({ pathname: `${initRoute}/postulantes`, state: { publication_id } })
    }

    const handleClickNext = () => {
        const index = postulantsByPublicationId?.data?.findIndex(item => item.user.account_id == postulant_id)
        if(index === postulantsByPublicationId.data.length - 1) return
        const { account_id } = postulantsByPublicationId?.data[index + 1].user
        postulant_id = account_id
        history.push( `${initRoute}/postulante/perfil/${postulant_id}`)
    }

    const handleClickGoToPrevious = () => {
        history.goBack()
    }

    const handleClickButtonSelect = () => {
        setModalData({
            title: "Seleccionar postulante",
            body: `Ud. ha seleccionado a ${applicantProfile?.user?.fullname}`,
            method: 'select',
            cancelAction: () =>
                setModalData({ ...modalData, show: false }),
            saveAction: () =>
                setModalData({ ...modalData, show: false }),
        })
        setOpenModal(true)
    }

    const handleClickButtonDeny = () => {
        setModalData({
            title: "Descartar postulante",
            body: `Ud. ha descartado a ${applicantProfile?.user?.fullname}`,
            method: 'deny',
            cancelAction: () =>
                setModalData({ ...modalData, show: false }),
            saveAction: () =>
                setModalData({ ...modalData, show: false }),

        })
        setOpenModal(true)
    }
    const handleClickButtonContract = () => {
        setModalData({
            title: "Contratar postulante",
            body: `Ud. desea contratar a ${applicantProfile?.user?.fullname}`,
            method: 'hire',
            cancelAction: () =>
                setModalData({ ...modalData, show: false }),
            saveAction: () =>
                setModalData({ ...modalData, show: false }),
        })
        setOpenModal(true)
    }

    const modalBody = (
        <>
            <h3 className="dashboard-subtitle">{modalData.title}</h3>
            <br />
            <p className="dashboard-applicant-data-response">{modalData.body}</p>
            <br />
            <br />
            <Grid container spacing={3} className="modal-button-container">
                <Grid item xs={6} justify="center" alignItems="center">
                    <Button
                        color="secondary"
                        size="large"
                        fullWidth

                        className="secondary-button"
                        onClick={() => setOpenModal(false)}
                    >
                        CANCELAR
                    </Button>
                </Grid>
                <Grid item xs={6} justify="center" alignItems="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        className="principal-button"
                        onClick={() => handleSaveOption(modalData.method)}
                    >
                        guardar
                    </Button>
                </Grid>
            </Grid>
        </>
    );

    return (
        <>
            <Container>
                <div className={classes.header}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Breadcrumbs routes={routes} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Button color="default" onClick={handleClickButtonSelect}>
                                                <div className={classes.containerImgWithText}>
                                                    <img src={registeredIcon} />
                                                    <span className="dashboard-applicant-options">
                                                        seleccionar
                                                    </span>
                                                </div>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button color="default" onClick={handleClickButtonDeny}>
                                                <div className={classes.containerImgWithText}>
                                                    <img src={closeIcon} />
                                                    <span className="dashboard-applicant-options">
                                                        descartar
                                                    </span>
                                                </div>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button color="default" onClick={handleClickButtonContract}>
                                                <div className={classes.containerImgWithText}>
                                                    <img src={checkCircleIcon} />
                                                    <span className="dashboard-applicant-options dark-gray">
                                                        contratar
                                                    </span>
                                                </div>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" component="h4">
                                        <strong>{applicantProfile?.user?.fullname}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.body}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography variant="h6" component="h6">
                                <strong>Datos personales</strong>
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Tipo de documento</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                DNI
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Numero de documento</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.user?.document_number}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Fecha de nacimiento</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {
                                    DateTime.fromISO(applicantProfile?.user?.birth_date).toFormat("yyyy-LL-dd")
                                }
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Departamento/Provincia/Distrito</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {`${applicantProfile?.user?.department?.name}/${applicantProfile?.user?.province?.name}/${applicantProfile?.user?.district?.name}`}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Dirección</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.user?.address}
                            </Typography>
                            <br />
                            
                            <Typography variant="subtitle2" component="h6">
                                <strong>teléfono</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.user?.phone}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Correo electrónico</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.email}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Estado civil</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.user?.civil?.name}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Edad</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.user?.age}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Género</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {getGenderById(applicantProfile?.user?.gender)}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Fecha de postulación</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {
                                    DateTime.fromISO(applicantProfile?.user?.updatedAt).toFormat("yyyy-LL-dd")
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h6" component="h6">
                                <strong>Experiencia laboral</strong>
                            </Typography>
                            <Typography variant="subtitle2" component="h6">
                                <strong>ÚLTIMA EXPERIENCIA LABORAL</strong>
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Cargo</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.job_level?.name}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Empresa</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.name_inst}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Distrito</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && getDistrictById(districts, applicantProfile?.job[0]?.district_id)}
                            </Typography>
                            <br />
                            
                            <Typography variant="subtitle2" component="h6">
                                <strong>Fecha de inicio</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.from_year}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Fecha de culminación</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.to_year}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                    <strong>Promedio de horas semanales</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.hour_rate}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Ingreso Mensual</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.monthly_income}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>¿Trabajaste horas extras?</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && applicantProfile?.job[0]?.over_time? "Si": "No"}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>¿Cómo calificaría su grado de compromiso con la empresa</strong>
                            </Typography>
                            <Typography variant="caption" component="p">
                                Del 1 al 5 siendo 1 totalmente descomprometido y 5 totalmente comprometido
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && (applicantProfile?.job[0]?.job_involvement || "----------")}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>¿Qué tan satisfecho se siente/sintió con la relacion entre el trabajo y su vida personal?</strong>
                            </Typography>
                            <Typography variant="caption" component="p">
                                Del 1 al 5 siendo 1 totalmente descomprometido y 5 totalmente comprometido
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.job && (applicantProfile?.job[0]?.job_sati || "----------")}
                            </Typography>
                            <br />
                            <br />


                            <Typography variant="h6" component="h6">
                                <strong>Estudios</strong>
                            </Typography>
                            <Typography variant="subtitle2" component="h6">
                                <strong>Nivel máximo alcanzado</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.education && applicantProfile?.education[0]?.level?.name}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Institución educativa</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.education && applicantProfile?.education[0]?.name_inst}
                            </Typography>
                            <br />
                            <Typography variant="subtitle2" component="h6">
                                <strong>Año de inicio</strong>
                            </Typography>
                            <Typography variant="body1" component="h6">
                                {applicantProfile?.education && applicantProfile?.education[0]?.from_year}
                            </Typography>
                            <br />

                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="flex-end">
                                <Grid item xs={2}>
                                    <Button variant="outlined" size="large" onClick={handleClickGoToPrevious}>Anterior</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" size="large" onClick={handleClickNext}>Siguiente</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
        
            </Container>
            <Modal
                open={openModal}
                handleCloseModal={() => setOpenModal(false)}
            >
                {modalBody}
            </Modal>
        </>
    );
};

export default ApplicantProfile;
