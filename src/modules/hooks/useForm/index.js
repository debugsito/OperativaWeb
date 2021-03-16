import React, { useState, useMemo } from 'react'

export function useForm(initialValues, validateOnChange = false, validate) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    // useEffect(() => {
    //     if (handleDisabledButtonState) {
    //         if (Object.values(values).every(x => (x != "" || x != false)) && Object.values(errors).every(x => x == "")) {
    //             setDisabledButtonState(false)
    //         } else {
    //             setDisabledButtonState(true)
    //         }
    //     }
    // }, [values])

    const disabledButtonState = useMemo(() => {
        const validValues = Object.values(values).every((x) => x != "" || x != false)
        const validErrors = Object.values(errors).every((x) => x == "")
        console.log("validValues", validValues)
        console.log("validErrors", validErrors)
        console.log("values", values)
        console.log("errors ", errors)
        if (validValues && validErrors) return false
        else return true

    }, [values])

    const handleInputChange = e => {
        const { type, name } = e.target

        const getValue = () => {
            if (type === "checkbox") {
                return e.target.checked
            } else {
                return e.target.value
            }
        }

        const value = getValue()
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))

        if (validateOnChange)
            validate({ [name]: value })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    }
}