import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Form, Stepper } from "../components";
import { Container, Grid, Paper } from "@material-ui/core";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";

const STEP = ['Datos personales', 'Datos de contacto', 'Educación', 'Experiencia laboral', 'Rubro de interés']

export default function Profile() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state?.auth)
    const { applicantProfile } = useSelector(state => state?.dashboard)
    const [activeIndex, setActiveIndex] = useState(0)

    const handleChangeIndex = () => {
        setActiveIndex(prevIndex => prevIndex + 1)
    }

    useEffect(() => {
        dispatch(getProfileOfApplicant({postulant_id:user.account.id}))
    },[])

    return (
        <Container className="dashboard-container">
            <Grid container spacing={5} justify="center">
                <Grid item xs={12}>
                    <Stepper activeIndex={activeIndex} step={STEP}/>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        {
                            applicantProfile &&
                            <Form activeIndex={activeIndex} handleChangeIndex={handleChangeIndex} title={STEP[activeIndex]}/>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
