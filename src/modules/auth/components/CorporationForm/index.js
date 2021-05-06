import React, { useState } from 'react'
import CorporationDataForm from "./CorporationDataForm";
import RepresentativeDataForm from "./RepresentativeDataForm";

import { useDispatch, useSelector } from "react-redux";
import { setStepTwo } from "../../../../store/actions/auth/auth.action";


export default function CorporationForm({ handleRegisterCompleted }) {
    const dispatch = useDispatch()
    const [isRepresentativeDataFormComplete, setIsRepresentativeDataFormComplete] = useState(false)
    const [representativeData, setRepresentativeData] = useState(null)
    const { corporationSignUp } = useSelector(state => state?.auth)
    console.log("isRepresentativeDataFormComplete", isRepresentativeDataFormComplete)

    const goNextForm = (values) => {
        setRepresentativeData(values)
        setIsRepresentativeDataFormComplete(true);
    }

    const goToPreviousForm = () => {
        dispatch(setStepTwo(false))
        // setIsRepresentativeDataFormComplete(false)
    }

    return (
        <>
            {
                corporationSignUp.stepTwo ?
                    <CorporationDataForm
                        handleRegisterCompleted={handleRegisterCompleted}
                        goToPreviousForm={goToPreviousForm}
                        representativeFormData={representativeData}
                    /> :
                    <RepresentativeDataForm
                        goNextForm={goNextForm}
                    />
            }
        </>
    )
}
