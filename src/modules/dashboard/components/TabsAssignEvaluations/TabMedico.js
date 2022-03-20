import React from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { Grid, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Typography, TextInput } from "../../../shared/components";

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
    name: "",
    address: "",
    reference: "",
    recomendation: "",
    file: [],
}


export default function TabMedico({ nextTab, backTab }) {
    const classes = useStyles();
    const { postulantsSelected } = useSelector(state => state?.dashboard)
    const validationSchema = Yup.object().shape({
        addresses: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Campo requerido'),
                address: Yup.string().required('Campo requerido'),
                reference: Yup.string().required("Campo requerido"),
                recomendation: Yup.string().required("Campo requerido"),
            })
        ),
    });

    const { control, handleSubmit, reset, trigger, setValue, getValues, formState: { errors, isSubmitting } } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: {
            addresses: [initialValues]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    const handleAddAddress = async () => {
        const length = fields.length - 1
        const isValid = await trigger([`addresses.${length}.name`, `addresses.${length}.address`, `addresses.${length}.reference`, `addresses.${length}.recomendation`]);
        if (isValid) {
            append(initialValues)
        }
    }

    const handleRemoveAddress = (index) => {
        remove(index)
    }

    const handleChangeFile = (index, _event) => {
        setValue(`addresses[${index}].file`, _event.target.files[0])
        // setValue(`addresses[${index}].filename`, _event.target.files[0].name)
        // getValues();
    }

    const onSubmit = async (data) => {
        const dataTemp = data.addresses
        const body = dataTemp.map(item => ({...item, publication_account_id:postulantsSelected[0]}))
        console.log("body", body);
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
                                    name={`addresses.${index}.name`}
                                    render={({ field }) => (
                                        <TextInput
                                            {...field}
                                            fullWidth
                                            label="Nombre"
                                            error={!!errors?.addresses?.[index]?.name}
                                            helperText={errors?.addresses?.[index]?.name?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.address`}
                                    render={({ field }) => (
                                        <TextInput
                                            fullWidth
                                            {...field}
                                            label="Dirección"
                                            error={!!errors?.addresses?.[index]?.address}
                                            helperText={errors?.addresses?.[index]?.address?.message} />
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
                                            label="Referencia"
                                            error={!!errors?.addresses?.[index]?.reference}
                                            helperText={errors?.addresses?.[index]?.reference?.message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.recomendation`}
                                    render={({ field }) => (
                                        <TextInput
                                            fullWidth
                                            {...field}
                                            label="Recomendaciones para el examén"
                                            error={!!errors?.addresses?.[index]?.recomendation}
                                            helperText={errors?.addresses?.[index]?.recomendation?.message}
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
                // <TextInput
                //     fullWidth
                //     {...field}
                //     label="Recomendaciones para el examén"
                //     error={!!errors?.addresses?.[index]?.recomendation}
                //     helperText={errors?.addresses?.[index]?.recomendation?.message}
                // />
            }
            <div className={classes.buttonAdd}>
                <Button color="secondary" size="large" onClick={handleAddAddress}> + AÑADIR DIRECCION</Button>
            </div>
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
