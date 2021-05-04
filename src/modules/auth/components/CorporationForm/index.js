import React, { useState } from 'react'
import CorporationDataForm from "./CorporationDataForm";
import RepresentativeDataForm from "./RepresentativeDataForm";


export default function CorporationForm({ handleRegisterCompleted }) {
    const [isRepresentativeDataFormComplete, setIsRepresentativeDataFormComplete] = useState(false)
    const [representativeData, setRepresentativeData] = useState(null)


    const goNextForm = (values) => {
        setRepresentativeData(values)
        setIsRepresentativeDataFormComplete(true);
    }

    const goToPreviousForm = () => {
        setIsRepresentativeDataFormComplete(false)
    }

    return (
        <>
            {
                isRepresentativeDataFormComplete ?
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
