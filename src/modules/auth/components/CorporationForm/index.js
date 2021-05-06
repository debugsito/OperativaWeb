import React, { useState } from 'react'
import CorporationDataForm from "./CorporationDataForm";
import RepresentativeDataForm from "./RepresentativeDataForm";

import { useDispatch, useSelector } from "react-redux";
import { setStepTwo } from "../../../../store/actions/auth/auth.action";


export default function CorporationForm({ handleRegisterCompleted }) {
    const dispatch = useDispatch()
    const { corporationSignUp } = useSelector(state => state?.auth)

    const goToPreviousForm = () => {
        dispatch(setStepTwo(false))
    }

    return (
        <>
            {
                corporationSignUp.stepTwo ?
                    <CorporationDataForm
                        handleRegisterCompleted={handleRegisterCompleted}
                        goToPreviousForm={goToPreviousForm}
                    /> :
                    <RepresentativeDataForm />
            }
        </>
    )
}
