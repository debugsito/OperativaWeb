import React, { useContext,useEffect,useState } from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { Grid, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Typography, TextInput } from "../../../shared/components";

//Services
import {service_Resources, service_Dashboard} from "../../../../store/services";

//Context
import { ContextNotification } from "../../context/NotificationAlertContext";

//Constans
import { messageSuccessful, messageError } from "../../utils/notification";
//Services
import { service_Applicant } from "../../../../store/services";
import { produce } from "immer";

const useStyles = makeStyles(theme => ({
    buttons: {
        marginTop: "2rem"
    },
    form: {
        background: "#fff",
        padding: "3rem",
        margin: "1rem 0"
    },
    buttonAdd: {
        display: "flex",
        justifyContent: "flex-end",
        margin: "1rem 0"
    }
}))

const initialValues = {
    medical_center: "",
    direction: "",
    instructions: "",
    reference: "",
    file: "",
    medical_date: null
}

export default function TabMedico({ nextTab, backTab }) {
    const classes = useStyles();
    const [address,setAddress]= useState(initialValues);
    const { postulantsSelected } = useSelector(state => state?.dashboard)
    const { notification, setNotification } = useContext(ContextNotification);
    const validationSchema = Yup.object().shape({
        addresses: Yup.array().of(
            Yup.object().shape({
                medical_center: Yup.string().required('Campo requerido'),
                direction: Yup.string().required('Campo requerido'),
                reference: Yup.string().required("Campo requerido"),
                instructions: Yup.string().required("Campo requerido"),
            })
        ),
    });

    useEffect(async () => {
        let ids = postulantsSelected.ids.join(',');
        await  service_Applicant.getPublicationAccountMedicalTests(ids).then((obj)=> {
            let cache = obj.data.data;
            console.log(cache);
            if(cache.length> 0){
                setAddress(cache[0]);
                setValue('addresses',[cache[0]])
            }
        }, error=> {
        })


    },[postulantsSelected])

    const { control, handleSubmit, reset, trigger, setValue, formState: { errors, isSubmitting } } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: {
            addresses: [address]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    // const handleAddAddress = async () => {
    //     const length = fields.length - 1
    //     const isValid = await trigger([`addresses.${length}.name`, `addresses.${length}.address`, `addresses.${length}.reference`, `addresses.${length}.recomendation`]);
    //     if (isValid) {
    //         append(initialValues)
    //     }
    // }

    const handleOnChange = (e,key) => {
        setAddress(currentValue => produce(currentValue, (v) => {
            v[key] = e.target.value
        }))
    }

    const handleRemoveAddress = (index) => {
        remove(index)
    }

    const handleChangeFile = (index, _event) => {
        setValue(`addresses[${index}].file`, _event.target.files[0])
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        const dataTemp = data.addresses[0]
        let body = {
            ...dataTemp,
            publication_account_ids:postulantsSelected.ids,
        }
        if(dataTemp.file){//SI TIENE IMAGEN
            formData.append("image", dataTemp.file)
            service_Resources.saveImage(formData)
            .then(resp => {
                delete body.file;
                body.image_url = resp.data.image_url
                return service_Dashboard.saveMedicalTest(body)
            }).then(response => {
                setNotification({ ...notification, ...messageSuccessful() })
                nextTab()
            }).catch(error => {
                setNotification({ ...notification, ...messageError() });
            })
        }else{
            body.image_url=""
            service_Dashboard.saveMedicalTest(body)
            .then(resp => {
                setNotification({ ...notification, ...messageSuccessful() })
                nextTab()
            })
            .catch(error => {
                setNotification({ ...notification, ...messageError() })
            })
        }
    }

    return (
        <div>
            {
                fields.map((field, index) => (
                    <div className={classes.form} key={field.id}>
                        <Grid container spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1" color="secondary"><b>Análisis médico</b></Typography>
                            </Grid>
                            {
                                fields.length > 1 &&
                                <Grid item xs={2}>
                                    <Button startIcon={<DeleteIcon />} color="primary" size="large" onClick={() => handleRemoveAddress(index)}>Eliminar</Button>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography variant="body2">Indica a tu postulante la clinica y dirección donde realizará su evaluación médica</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.medical_center`}
                                    render={({ field }) => (
                                        <TextInput
                                            {...field}
                                            fullWidth
                                            label="Nombre"
                                            // onChange={(e) => handleOnChange(e,'medical_center')}
                                            // value={address.medical_center}
                                            error={!!errors?.addresses?.[index]?.medical_center}
                                            helperText={errors?.addresses?.[index]?.medical_center?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.direction`}
                                    render={({ field }) => (
                                        <TextInput
                                            fullWidth
                                            {...field}
                                            label="Dirección"
                                            // onChange={(e) => handleOnChange(e,'direction')}
                                            // value={address.direction}
                                            error={!!errors?.addresses?.[index]?.direction}
                                            helperText={errors?.addresses?.[index]?.direction?.message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.reference`}
                                    render={({ field }) => (
                                        <TextInput
                                            fullWidth
                                            {...field}
                                            // onChange={(e) => handleOnChange(e,'reference')}
                                            // value={address.reference}
                                            label="Referencia"
                                            error={!!errors?.addresses?.[index]?.reference}
                                            helperText={errors?.addresses?.[index]?.reference?.message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.instructions`}
                                    render={({ field }) => (
                                        <TextInput
                                            fullWidth
                                            {...field}
                                            label="Recomendaciones para el examén"
                                            // onChange={(e) => handleOnChange(e,'instructions')}
                                            // value={address.instructions}
                                            error={!!errors?.addresses?.[index]?.instructions}
                                            helperText={errors?.addresses?.[index]?.instructions?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.file`}
                                    defaultValue=""
                                    render={({ field }) => {
                                        return (
                                            <TextInput
                                                fullWidth
                                                {...field}
                                                label="Subir archivo"
                                                type="file"
                                                onChange={(e) => handleChangeFile(index, e)}
                                                value={field.value.filename}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        )
                                    }}
                                />

                            </Grid>
                        </Grid>
                    </div>
                ))
            }
            {/* <div className={classes.buttonAdd}>
                <Button color="secondary" size="large" onClick={handleAddAddress}> + AÑADIR DIRECCION</Button>
            </div> */}
            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={backTab}>REGRESAR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={() => reset()}>LIMPIAR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="large" onClick={handleSubmit(onSubmit)}>{isSubmitting ? "GUARDANDO..." : "GUARDAR"}</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={nextTab}>CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
