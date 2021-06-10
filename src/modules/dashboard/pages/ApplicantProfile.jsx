import React, { useEffect, useState } from "react";
import * as moment from 'moment';
import {Container,Divider,Grid,makeStyles,Typography} from "@material-ui/core";

import { Button, Breadcrumbs, Modal } from '../../shared/components';
import { checkCircleIcon, closeIcon, registeredIcon } from "../images";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicantProfile } from "../../../store/actions/dashboard/dashboard.action";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { service_Dashboard } from "../../../store/services";
import { useHistory } from "react-router-dom";

const ApplicantProfile = () => {
    const {postulant_id} = useParams()
    const dispatch = useDispatch();
    const {applicantProfile, applicantProfile:{user,job,education},publicationSelected} = useSelector(state => state.dashboard)
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({title:"", body:"",method:""})
    const {id:publication_id} = publicationSelected.data;
    const history = useHistory();
    const initRoute = SessionRoutes().initRoute;
    const routes = [
    { name: "Incio", to: `${initRoute}` },
    { name: "Postulantes", to: `${initRoute}/postulantes`},
    { name: "Perfil", to: `${initRoute}/postulante/perfil` }
    ];

    useEffect(() => {
        dispatch(getApplicantProfile({postulant_id}))
    },[])


    const handleSaveOption = async (method) => {
        
        const {id : user_id} = applicantProfile.user;
        let obj ={ 
            user_id
        }
         switch (method) {
             case 'select':
                let response = await service_Dashboard.selectApplicant(obj,publication_id);
                 break;
             case 'deny':
                let response2 = await service_Dashboard.denyApplicant(obj,publication_id);
                 break;
             case 'hire':
                let response3 = await service_Dashboard.hireApplicant(obj,publication_id);
                 break
             default:
                 break;
         }
        setOpenModal(false);
        history.push({ pathname: `${initRoute}/postulantes`, state: { publication_id } })
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
            <Container >
                <Grid container spacing={3} className="postulant-perfil" style={{marginTop:"20%"}}>
                    <Grid item xs={12} className="postulant-perfil__header" style={{ position:"fixed", top:"4rem", background:"white" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Breadcrumbs routes={routes} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3} justify="flex-end">
                                            <Grid item spacing={3}>
                                                <Button
                                                    color="default"
                                                    onClick={() =>
                                                        {setModalData({
                                                            title: "Seleccionar postulante",
                                                            body:`Ud. ha seleccionado a ${user?.fullname}`,
                                                            method: 'select',
                                                            cancelAction: () =>
                                                                setModalData({ ...modalData, show: false }),
                                                            saveAction: () =>
                                                                setModalData({ ...modalData, show: false }),
                                                        })
                                                        setOpenModal(true)
                                                    }
                                                    }
                                                >
                                                    <img src={registeredIcon} />
                                                    <span className="dashboard-applicant-options">
                                                        seleccionar
                                        </span>
                                                </Button>
                                            </Grid>
                                            <Grid item spacing={3}>
                                                <Button
                                                    color="default"
                                                    onClick={() =>
                                                        {setModalData({
                                                            title: "Descartar postulante",
                                                            body: `Ud. ha descartado a ${user?.fullname}`,
                                                            method: 'deny',
                                                            cancelAction: () =>
                                                                setModalData({ ...modalData, show: false }),
                                                            saveAction: () =>
                                                                setModalData({ ...modalData, show: false }),
                                                            
                                                        })
                                                        setOpenModal(true)
                                                        }
                                                    }
                                                >
                                                    <img src={closeIcon} />
                                                    <span className="dashboard-applicant-options">
                                                        descartar
                                        </span>
                                                </Button>
                                            </Grid>
                                            <Grid item spacing={3}>
                                                <Button
                                                      color="default"
                                                    onClick={() =>
                                                        {setModalData({
                                                            title: "Contratar postulante",
                                                            body: `Ud. desea contratar a ${user?.fullname}`,
                                                            method: 'hire',
                                                            cancelAction: () =>
                                                                setModalData({ ...modalData, show: false }),
                                                            saveAction: () =>
                                                                setModalData({ ...modalData, show: false }),
                                                        })
                                                        setOpenModal(true)
                                                        }
                                                    }
                                                >
                                                    <img src={checkCircleIcon} />
                                                    <span className="dashboard-applicant-options dark-gray">
                                                        contratar
                                        </span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h4" component="h4">
                                            <strong>{user?.fullname}</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} className="postulant-perfil__content" style={{ margin: "1rem" }}>
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
                                    76443280
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Fecha de nacimiento</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                {moment(user?.birth_date).format("YYYY-MM-DD")}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Departamento/Provincia/Distrito</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {`${user?.department?.name}/${user?.province?.name}/${user?.district?.name}`}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Dirección</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {user?.address}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Referencias</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    -----
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>teléfono</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {user?.phone}
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
                                    {user?.civil?.name}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Fecha de postulación</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {moment(user?.updatedAt).format("YYYY-MM-DD")}
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
                                    {job && job[0]?.job_level?.name}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Empresa</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.name_inst}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Dirección de la empresa</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.address}
                                </Typography>
                                <br />
                                {/* <Typography variant="subtitle2" component="h6">
                                    <strong>Rubro</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    ----------
                                </Typography>
                                <br /> */}
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Fecha de inicio</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.from_year}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>fecha de fin</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.to_year}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Promedio de horas semanales</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.hour_rate}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Ingreso Mensual</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.monthly_income}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>¿Trabajaste horas extras?</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    { job && job[0]?.over_time}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>¿Cómo calificaría su grado de compromiso con la empresa
                                    </strong>
                                </Typography>
                                <Typography variant="caption" component="p">
                                    Del 1 al 5 siendo 1 totalmente descomprometido y 5 totalmente comprometido
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.involvement || "----------"}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>¿Qué tan satisfecho se siente/sintió con la relacion entre el trabajo y su vida personal?</strong>
                                </Typography>
                                <Typography variant="caption" component="p">
                                    Del 1 al 5 siendo 1 totalmente descomprometido y 5 totalmente comprometido
                                </Typography>
                                <Typography variant="body1" component="h6">
                                {job && job[0]?.job_sati}
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
                                    {education && education[0]?.level?.name}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Institución educativa</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    { education && education[0]?.name_inst}
                                </Typography>
                                <br />
                                <Typography variant="subtitle2" component="h6">
                                    <strong>Año de inicio</strong>
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {job && job[0]?.from_year}
                                </Typography>
                                <br />
                                
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
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
