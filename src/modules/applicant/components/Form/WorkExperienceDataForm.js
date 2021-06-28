import React from 'react'
import { useSelector } from "react-redux";
import WithWorkExperiencie from "./WithWorkExperiencie";


//COSAS POR HACER:
//Obtener la data
//Condicional para renderizar: componente con o sin Experiencia (WithWorkExperience o WithoutWorkExperience)
//Pasar por props la data

export default function WorkExperienceDataForm(props) {
    const { applicantProfile } = useSelector(state => state?.dashboard)


    return (
        <>
            <WithWorkExperiencie data={applicantProfile} />
        </>
    )
}
