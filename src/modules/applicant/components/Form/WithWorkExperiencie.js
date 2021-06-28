import React from 'react'
import { useForm } from "../../../hooks/useForm";
import WithWorkExperienceForm from "./WithWorkExperienceForm";
import { normalize } from "../../../shared/utils/postulantForm.utils";

//COSAS POR HACER:
//Normalizar la data (c/s experiencia), por ahora solo con experiencia.
//Manejar el estado (useForm)


export default function WithWorkExperiencie({ data }) {
    let initialValues = normalize.workExperienceData(data)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('position' in fieldValues)
            temp.position = fieldValues.position ? "" : "El campo es requerido."
        if ('company' in fieldValues)
            temp.company = fieldValues.company ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('rubro_id' in fieldValues)
            temp.rubro_id = fieldValues.rubro_id ? "" : "El campo es requerido."
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate ? "" : "El campo es requerido."
        if ('weeklyHours' in fieldValues)
            temp.weeklyHours = fieldValues.weeklyHours ? "" : "El campo es requerido."
        if ('monthlyIncome' in fieldValues)
            temp.monthlyIncome = fieldValues.monthlyIncome ? "" : "El campo es requerido."
        if ('hasExtraHours' in fieldValues)
            temp.hasExtraHours = fieldValues.hasExtraHours ? "" : "El campo es requerido."
        if ('commitmentDegree' in fieldValues)
            temp.commitmentDegree = fieldValues.commitmentDegree ? "" : "El campo es requerido."
        if ('workingRelationship' in fieldValues)
            temp.workingRelationship = fieldValues.workingRelationship ? "" : "El campo es requerido."
        // if (!hasWork) {
        //     if ('finishDate' in fieldValues)
        //         temp.finishDate = fieldValues.finishDate ? "" : "El campo es requerido."
        //     if ('withdrawalReason' in fieldValues)
        //         temp.withdrawalReason = fieldValues.withdrawalReason ? "" : "El campo es requerido."
        // }

        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);


    return (
        initialValues.map((item, index) => <WithWorkExperienceForm handleInputChange={handleInputChange} values={values} />)
    )
}
