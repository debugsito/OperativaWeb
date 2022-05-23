import React, { useState, useEffect } from 'react';

//Librerias
import { useDispatch, useSelector } from 'react-redux';

//componentes
import {
    ApplicantContactInformationForm,
    ApplicantEducationForm,
    ApplicantPersonalDataForm,
    ApplicantWorkExperienceForm,
    ApplicantAreasOfInterestForm,
    ApplicantQuestionnaire
} from '../components';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button, Modal, LinearProgress } from '../../shared/components';

//Servicios
import { service_ApplicantProfile } from '../../../store/services';
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { getAccount } from "../../../store/actions/auth/auth.middleware";
import { numberOneSVG, numberTwoSVG, numberThreeSVG, numberFourSVG, numberFiveSVG, numberSixSVG } from '../../shared/images/postulant';

//UTILS
import { getOS } from '../../shared/utils';
import { normalize } from '../../shared/utils/postulantForm.utils';


const useStyle = makeStyles(theme => ({
    expandIcon: {
        color: "var(--paragraphColor)",
        '&$expanded': {
            transform: "rotate(360deg)"
        },
    },
    expanded: {},
}))

const Profile = ({ history }) => {
    // console.log("RENDER¡¡¡¡¡¡¡¡")
    const dispatch = useDispatch();
    const classes = useStyle()
    const { user } = useSelector(state => state?.auth);
    const { applicantProfile } = useSelector(state => state?.dashboard);
    const [profile, setProfile] = useState(null)
    const [workExperience, setWorkExperience] = useState(null)
    const [step, setStep] = useState(1)

    const [personalData, setPersonalData] = useState()
    const [contactInformation, setContactInformation] = useState()
    const [education, setEducation] = useState()
    const [areasOfInterest, setAreasOfInterest] = useState()
    const [hasExperience, setHasExperience] = useState()
    const [questionnaire, setQuestionnaire] = useState()

    useEffect(() => {
        dispatch(getProfileOfApplicant({postulant_id:user.account.id}))
    }, [])

    useEffect(() => {
        if (applicantProfile) {
            const workExperience_temp = normalize.workExperienceData(applicantProfile)
            setProfile(applicantProfile)
            setWorkExperience(workExperience_temp)
        }
    }, [applicantProfile])

    const handleSavePersonalData = async (data) => {
        if (data) {
            // saveApplicantProfile('personalData', data)
            setPersonalData(data)
            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister(data);
                if (response.status === 200) {
                    dispatch(getAccount())
                    setStep(2)
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
            setStep(2)
        }
    }

    const handleSaveContactInformation = async (data) => {
        if (data) {
            const dataTemp = { ...data }
            dataTemp.operating_system = getOS()
            // saveApplicantProfile('contactInformation', dataTemp)
            setContactInformation(dataTemp)
            setStep(3)
            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister(dataTemp);
                if (response.status === 200) {
                    dispatch(getAccount())
                    setStep(3)
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
        }
    }

    const handleSaveEducation = async (data) => {
        if (data) {
            // saveApplicantProfile('education', data);
            setEducation(data);
            try {
                const response = await service_ApplicantProfile.applicantEducationRegister(data);
                if (response.status === 200) {
                    dispatch(getAccount())
                    setStep(4)
                }
            } catch (error) {
                // MensajeError(error.response.data.message);
            }
        }
    }

    const handleSaveAreasOfInterest = async (data) => {
        let body = { id: profile.id, ...data }
        setAreasOfInterest(data)
        try {
            const response = await service_ApplicantProfile.applicantPersonalDataRegister(body);
            if (response.status === 200) {
                dispatch(getAccount())
                setStep(6) //Mostrar Datos completados con éxito
            }
        } catch (error) {

        }
    }

    const handleSaveQuestionnaire = async (data) => {
        let body = { id: profile.id, ...data }
        setQuestionnaire(data);
        try {
            const response = await service_ApplicantProfile.applicantPersonalDataRegister(body);
            if (response.status === 200) {
                dispatch(getAccount())
                setStep(7) //Mostrar Datos completados con éxito
            }
        } catch (error) {

        }
    }

    const saveApplicantProfile = (property, value) => {
        // dispatch(setUser({ ...user, account: { ...user.account, [property]: value } }))
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
        <Grid container justify="center" alignItems="center" style={{ padding: 20 }}>
            <Grid item xs={12} md={12} lg={12}>
                <LinearProgress variant="determinate" value={(step - 1) * 16.67} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Accordion expanded={step === 1} onChange={(event, expanded) => personalData && setStep(expanded ? 1 : 0)}>
                    <AccordionSummary
                        classes={{
                            expanded: classes.expanded,
                            expandIcon: classes.expandIcon,
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
                        {profile && <ApplicantPersonalDataForm user={normalize.personalData(profile)} handleSavePersonalData={handleSavePersonalData} />}
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={step === 2} onChange={(event, expanded) => contactInformation && setStep(expanded ? 2 : 0)}>
                    <AccordionSummary
                        classes={{
                            expanded: classes.expanded,
                            expandIcon: classes.expandIcon,
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
                        {profile && <ApplicantContactInformationForm user={normalize.contactData(profile)} handleSaveContactInformation={handleSaveContactInformation} />}
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={step === 3} onChange={(event, expanded) => education && setStep(expanded ? 3 : 0)}>
                    <AccordionSummary
                        classes={{
                            expanded: classes.expanded,
                            expandIcon: classes.expandIcon,
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
                        {profile && <ApplicantEducationForm user={normalize.educationData(profile)} handleSaveEducation={handleSaveEducation} />}
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={step === 4} onChange={(event, expanded) => workExperience && setStep(expanded ? 4 : 0)}>
                    <AccordionSummary
                        classes={{
                            expanded: classes.expanded,
                            expandIcon: classes.expandIcon,
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
                        {profile &&
                            <ApplicantWorkExperienceForm
                                history={history}
                                userData={normalize.workExperienceData(profile)}
                                setStep={setStep}
                            // handleSaveWorkExperience={handleSaveWorkExperience}
                            // handleUpdateWorkExperience={(data) => setWorkExperience(data)}
                            />
                        }
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={step === 5} onChange={(event, expanded) => areasOfInterest && setStep(expanded ? 5 : 0)}>
                    <AccordionSummary
                        classes={{
                            expanded: classes.expanded,
                            expandIcon: classes.expandIcon,
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
                        {
                            profile &&
                            <ApplicantAreasOfInterestForm
                                userData={normalize.rubroOfinterestData(profile)}
                                handleSaveAreasOfInterest={handleSaveAreasOfInterest}
                            />
                        }
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={step === 6} onChange={(event, expanded) => questionnaire && setStep(expanded ? 6 : 0)} >

                    <AccordionSummary
                        classes={{
                            expanded: classes.expanded,
                            expandIcon: classes.expandIcon,
                        }}
                        expandIcon={expandIcon(questionnaire, 6)}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className="applicant-profile__accordion-header" variant="button" gutterBottom>
                            <img src={numberSixSVG} alt="Sexto paso" width="24" height="25" />
                            Cuestionario de posicionamiento
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {
                            profile &&
                            <ApplicantQuestionnaire
                                user={normalize.questionnaireData(profile)}
                                handleSaveQuestionnaire={handleSaveQuestionnaire}
                            />
                        }
                    </AccordionDetails>



                </Accordion>
            </Grid>
        </Grid>
    )
}

export default Profile;
