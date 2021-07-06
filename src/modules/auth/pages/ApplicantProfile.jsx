import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { ApplicantContactInformationForm, ApplicantEducationForm, ApplicantPersonalDataForm, ApplicantWorkExperienceForm, ApplicantAreasOfInterestForm } from '../components';
import { Button, LinearProgress } from '../../shared/components';
import { getOS } from '../../shared/utils';
import { service_ApplicantProfile } from '../../../store/services';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { filesSVG, numberOneSVG, numberTwoSVG, numberThreeSVG, numberFourSVG, numberFiveSVG, successSVG } from '../images';
import "../styles/ApplicantProfile.css";

const useStyle = makeStyles(theme => ({
    expandIcon:{
        color: "var(--paragraphColor)",
        '&$expanded':{
            transform: "rotate(360deg)"
        },
    },
    expanded:{},
}))

const ApplicantProfile = ({ history }) => {
    const dispatch = useDispatch();
    const classes = useStyle()
    const { user } = useSelector(state => state?.auth);

    const [step, setStep] = useState(1)
    const [personalData, setPersonalData] = useState()
    const [contactInformation, setContactInformation] = useState()
    const [education, setEducation] = useState()
    const [workExperience, setWorkExperience] = useState()
    const [areasOfInterest, setAreasOfInterest] = useState()
    const [hasExperience, setHasExperience] = useState()

    const handleSavePersonalData = async (data) => {
        if (data) {
            saveApplicantProfile('personalData', data)
            setPersonalData(data)
            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister(data);
                if (response.status === 200) setStep(2)
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
        }
    }

    const handleSaveContactInformation = async (data) => {
        if (data) {
            let dataTemp = {...data}
            dataTemp.operating_system = getOS()
            saveApplicantProfile('contactInformation', dataTemp)
            setContactInformation(dataTemp)
            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister(dataTemp);
                if (response.status === 200) {
                    setStep(3)
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
        }
    }

    const handleSaveEducation = async (data) => {
        if (data) {
            saveApplicantProfile('education', data);
            setEducation(data);
            try {
                const response = await service_ApplicantProfile.applicantEducationRegister(data);
                if (response.status === 200) {
                    setStep(4)
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
        }
    }

    const handleSaveWorkExperience = async (data, hasExperience) => {
        if (data) {
            setHasExperience(hasExperience.value)
            setWorkExperience(data);
            saveApplicantProfile('workExperience', data);
            if (hasExperience.value === "withExperience") {
                try {
                    const responseEducation = await service_ApplicantProfile.applicantWithExperienceRegister(data);
                    if (responseEducation.status === 200) {
                        setStep(5)
                    }
                } catch (error) {
                    // MensajeError(error.response.data.message);
                }
            } else {
                setStep(5)
                // try {
                //     const responseEducation = await service_ApplicantProfile.applicantWithoutExperienceRegister(data);
                //     if (responseEducation.status === 200) {
                //         setStep(5)
                //     }
                // } catch (error) {
                //     // MensajeError(error.response.data.message);
                // }
            }
        }
    }

    const handleSaveAreasOfInterest = async (data) => {
        saveApplicantProfile('areasOfInterest', data)
        if(hasExperience === "withExperience"){
            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister({ ...data });
                if (response.status === 200) {
                    setStep(6) //Mostrar Datos completados con éxito
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
        }else {
            try {
                const responseEducation = await service_ApplicantProfile.applicantWithoutExperienceRegister({...workExperience,...data});
                if (responseEducation.status === 200) {
                    setStep(6)
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
    }
        
    }

    const saveApplicantProfile = (property, value) => {
        dispatch(setUser({ ...user, account: { ...user.account, [property]: value } }))
    };

    const expandIcon = (validation, selectedStep) => (
        validation ? 
            <CheckCircleIcon /> : 
            (
                step === selectedStep ? 
                <ExpandLessIcon style={{ color: "var(--secondaryButtonColor)" }} /> : 
                <ChevronRightIcon style={{ color: "var(--paragraphColor)" }} />
            )
        )

    return (
        <Grid container justify="center" alignItems="center" spacing={2} style={{ padding: 20 }}>
            {step !== 6 ?
                <>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h6" component="h6" className="title-color">
                            Hola, {user?.account?.name || user?.account?.email}:
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2} md={2} className="justify-center">
                        <img src={filesSVG} width="120" alt="" />
                    </Grid>
                    <Grid item xs={9} sm={10} md={10} >
                        <Typography variant="body1" component="p" className="title-color">
                            Crear tu CV para ser visible por miles de empresas.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <LinearProgress variant="determinate" value={50} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Accordion expanded={step === 1} onChange={(event, expanded) => personalData && setStep(expanded ? 1 : 0)}>
                            <AccordionSummary
                                 classes={{
                                    expanded: classes.expanded,
                                    expandIcon:classes.expandIcon,
                                }}
                                aria-controls="panel1a-content"
                                expandIcon={expandIcon(personalData, 1)}
                                id="panel1a-header"
                            >
                                <Typography className="applicant-profile__accordion-header" variant="button" gutterBottom>
                                    <img src={numberOneSVG} alt="Primer paso" />
                                    Datos personales
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApplicantPersonalDataForm user={user?.account?.personalData} handleSavePersonalData={handleSavePersonalData} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={step === 2} onChange={(event, expanded) => contactInformation && setStep(expanded ? 2 : 0)}>
                            <AccordionSummary
                                classes={{
                                    expanded: classes.expanded,
                                    expandIcon:classes.expandIcon,
                                }}
                                expandIcon={expandIcon(contactInformation, 2)}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className="applicant-profile__accordion-header" variant="button" gutterBottom>
                                    <img src={numberTwoSVG} alt="Primer paso" />
                                    Datos de contacto
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApplicantContactInformationForm user={user?.account?.contactInformation} handleSaveContactInformation={handleSaveContactInformation} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={step === 3} onChange={(event, expanded) => education && setStep(expanded ? 3 : 0)}>
                            <AccordionSummary
                                classes={{
                                    expanded: classes.expanded,
                                    expandIcon:classes.expandIcon,
                                }}
                                expandIcon={expandIcon(education, 3)}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className="applicant-profile__accordion-header" variant="button" gutterBottom>
                                    <img src={numberThreeSVG} alt="Primer paso" />
                                    Educación
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApplicantEducationForm user={user?.account?.education} handleSaveEducation={handleSaveEducation} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={step === 4} onChange={(event, expanded) => workExperience && setStep(expanded ? 4 : 0)}>
                            <AccordionSummary
                                classes={{
                                    expanded: classes.expanded,
                                    expandIcon:classes.expandIcon,
                                }}
                                expandIcon={expandIcon(workExperience, 4)}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className="applicant-profile__accordion-header" variant="button" gutterBottom>
                                    <img src={numberFourSVG} alt="Primer paso" />
                                    Experiencia laboral
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApplicantWorkExperienceForm
                                    history={history}
                                    userData={user?.account?.workExperience}
                                    handleSaveWorkExperience={handleSaveWorkExperience}
                                    handleUpdateWorkExperience={(data) => saveApplicantProfile('workExperience', data)} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={step === 5} onChange={(event, expanded) => areasOfInterest && setStep(expanded ? 5 : 0)}>
                            <AccordionSummary
                                classes={{
                                    expanded: classes.expanded,
                                    expandIcon:classes.expandIcon,
                                }}
                                expandIcon={expandIcon(areasOfInterest, 5)}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className="applicant-profile__accordion-header" variant="button" gutterBottom>
                                    <img src={numberFiveSVG} alt="Quinto paso" />
                                    Rubro de interés
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApplicantAreasOfInterestForm
                                    userData={user?.account?.areasOfInterest}
                                    handleSaveAreasOfInterest={handleSaveAreasOfInterest}
                                // handleSaveWorkExperience={handleSaveWorkExperience} 
                                // handleUpdateWorkExperience={(data) => saveApplicantProfile('workExperience', data)} 
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </>
                :
                <>
                    <Grid item xs={10} sm={6} md={5} lg={4}>
                        <Grid container spacing={2} direction="column" justify="center" alignItems="center" style={{ marginTop: "2rem" }}>
                            <Grid item xs={12} className="justify-center">
                                <img src={successSVG} alt="" />
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant="h4" component="h4">
                                    Muchas gracias.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant="h6" component="h6">
                                    ¡Tu CV se guardó con éxito!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant="body1" component="p">
                                    Pronto las empresas se pondrán en contacto contigo.
                                </Typography>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Button 
                                    fullWidth 
                                    size="large" 
                                    variant="contained" 
                                    onClick={() => {dispatch(signOut()); history.push("/")}}
                                >
                                    finalizar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            }
        </Grid>
    )
}

export default ApplicantProfile;