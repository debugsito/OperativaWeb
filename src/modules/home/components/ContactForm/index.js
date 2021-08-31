import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ButtonContact, TextInput } from "../";
import { useForm } from "../../../hooks";
import { sendEmailOfBusiness, sendEmailOfPostulant } from "../../../../store/actions/home/home.middleware";

const initialValues = {
    name: "",
    razon_social: null,
    document: null,
    phone: "",
    email: "",
    message: "",
}
const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    headerForm: {
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            bottom: '105px',
        },
    },
    headerContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid',
            gridTemplateColumns: '2fr 4fr 4fr 1fr',
        },
        [theme.breakpoints.up('md')]: {
        },
    },
    textContainer: {
        gridColumn: '3/4'
    },
    textBe: {
        [theme.breakpoints.down('sm')]: {
            textAlign: "left"
        },
    },
    containerButton: {
        gridColumn: '2/4',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            // width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
    containerInputs: {
        marginTop: '1rem',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '1.5rem',
            position: 'relative',
            bottom: '110px',
        },
    },
    textArea: {
        width: '100%',
        background: '#F5F7F9 0% 0% no-repeat padding-box',
        borderRadius: '25px',
        color: '#373737',
        fontFamily: "var(--fontFamily)",
        border: 0,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        padding: '.375rem .75rem',
        resize: 'none',
        '&:focus': {
            color: '#495057',
            backgroundColor: '#fff',
            borderColor: '#80bdff',
            outline: 0,
            boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
        }
    }

}))

export default function ContactForm() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { error, status } = useSelector(state => state?.home)
    const [business, setBusiness] = useState(true)
    const [postulant, setPostulant] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "El campo es requerido."
        if ('razon_social' in fieldValues)
            temp.razon_social = fieldValues.razon_social ? "" : "El campo es requerido."
        if ('document' in fieldValues)
            temp.document = fieldValues.document ? "" : "El campo es requerido."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "El campo es requerido."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "El campo es requerido."
        if ('message' in fieldValues)
            temp.message = fieldValues.message ? "" : "El campo es requerido."

        setErrors({ ...temp })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);

    const handleClickBusiness = () => {
        setBusiness(true)
        setPostulant(false)
        setValues({ ...values, document: null })
    }

    const handleClickPostulante = () => {
        setBusiness(false)
        setPostulant(true)
        setValues({ ...values, razon_social: null })
    }

    const handleChangeSendEmail = () => {
        if (business) {
            dispatch(sendEmailOfBusiness(values))
        } else if (postulant) {
            dispatch(sendEmailOfPostulant(values))
        }

    }

    return (
        <div className={classes.root}>
            <div className={classes.headerForm}>
                <div className={classes.headerContainer}>
                    <div className={classes.textContainer}>
                        <h2 className={classes.textBe}>Soy...</h2>
                    </div>
                    <div className={classes.containerButton}>
                        <ButtonContact active={business} handleClick={handleClickBusiness}>Empresa</ButtonContact>
                        <ButtonContact active={postulant} handleClick={handleClickPostulante}>Postulante</ButtonContact>
                    </div>
                </div>
            </div>
            <div className={classes.containerInputs}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <TextInput
                            type="text"
                            name="name"
                            placeholder="Nombre y apellido"
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        {business &&
                            <TextInput
                                type="text"
                                name="razon_social"
                                placeholder="Razón Social"
                                value={values.razon_social || ""}
                                onChange={handleInputChange}
                            />
                        }
                        {
                            postulant &&
                            <TextInput
                                placeholder="DNI (Opcional)"
                                name="document"
                                value={values.document || ""}
                                onChange={handleInputChange}
                            />
                        }

                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={5}>
                            <Grid item xs={5}>
                                <TextInput
                                    type="tel"
                                    name="phone"
                                    placeholder="Teléfono"
                                    value={values.phone}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <TextInput
                                    type="email"
                                    name="email"
                                    placeholder="Correo"
                                    value={values.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={10}>
                        <textarea
                            placeholder="Mensaje"
                            className={classes.textArea}
                            name="message"
                            value={values.message}
                            onChange={handleInputChange}
                            rows="4"
                            cols="40"
                        >
                        </textarea>
                    </Grid>
                    <Grid item xs={3} className="align-items-center">
                        <TextInput
                            type="button"
                            name="send"
                            value="Enviar"
                            onClick={handleChangeSendEmail}
                            button
                        />
                    </Grid>
                    <Grid item xs={7}>
                        {
                            status === "loading" &&
                            <p>Enviando...</p>
                        }
                        {
                            (status === "success" && status !== "failure") &&
                            <p>Mensaje enviado</p>
                        }
                        {
                            error &&
                            <p>{error.message}</p>
                        }

                    </Grid>

                </Grid>
            </div>

        </div>
    )
}
