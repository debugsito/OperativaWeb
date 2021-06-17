import React, { useEffect, useState } from 'react'
import { Container, Grid, MenuItem, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import { Breadcrumbs, TextInput, Button, Select, Modal, RichText } from "../../shared/components";
import { useForm } from "../../hooks";
import { getPeriods } from "../../../store/services/utils.service";
import { updatePublication, savePublication, getJobsInfo } from "../../../store/actions/dashboard/dashboard.action";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from "../../../store/actions";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { onlyNumbers } from '../../shared/libs/validators';

const defaultValues = {
    job_title: "",
    description: "",
    requirements: "",
    job_level_id: "",//rubro
    address: "",
    district_id: "",
    period: "",
    salary: "",
    from_date: "",
    expiration_date: "",
    department_id: "",
    province_id: "",
};

export default function EditPosition({ history }) {
    const dateLocal = DateTime.local().toFormat("yyyy-LL-dd")
    const dispatch = useDispatch();
    const { departments, provinces, districts, rubrosOp } = useSelector(state => state?.utils)
    const { publicationSelected } = useSelector(state => state?.dashboard)
    const [periods, setPeriods] = useState([])
    const [districtsList, setDistrictsList] = useState([])
    const [provincesList, setProvincesList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [isActiveSalary, setIsActiveSalary] = useState(publicationSelected?.a_tratar)

    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: publicationSelected ? "Editar posición" : "Publicar empleo", to: `${initRoute}/editar-posicion` }];
    const initialValues = publicationSelected ? {
        job_title: publicationSelected.job_title,
        description: JSON.parse(publicationSelected.description),
        requirements: JSON.parse(publicationSelected.requirements),
        job_level_id: publicationSelected.job_level_id,//rubro
        address: publicationSelected.address,
        district_id: publicationSelected.district.id,
        period: publicationSelected.period,
        salary: publicationSelected.salary,
        from_date: DateTime.fromISO(publicationSelected?.from_date).toFormat("yyyy-LL-dd"),//moment(publicationSelected.from_date).format("YYYY-MM-DD"),
        expiration_date: DateTime.fromISO(publicationSelected?.expiration_date).toFormat("yyyy-LL-dd"),//moment(publicationSelected.to_date).format("YYYY-MM-DD"),
        department_id: publicationSelected.district.province.department_id,//EN DURO
        province_id: publicationSelected.district.province_id, //EN DURO
        rubro_id: publicationSelected.job_level_id,
        period_id: publicationSelected.period,
    } : defaultValues

    const goForward = () => history.push(initRoute);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('job_title' in fieldValues)
            temp.job_title = fieldValues.job_title ? "" : "El campo es requerido."
        if ('description' in fieldValues)
            temp.description = fieldValues.description[0].children[0].text ? "" : "El campo es requerido."
        if ('requirements' in fieldValues)
            temp.requirements = fieldValues.requirements[0].children[0].text ? "" : "El campo es requerido."
        if ('job_level_id' in fieldValues)
            temp.job_level_id = fieldValues.job_level_id ? "" : "El campo es requerido."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('period' in fieldValues)
            temp.period = fieldValues.period ? "" : "El campo es requerido."
        if (!isActiveSalary) {
            if ('salary' in fieldValues)
                temp.salary = fieldValues.salary ? "" : "El campo es requerido en numeros."
        }
        if ('from_date' in fieldValues)
            temp.from_date = fieldValues.from_date ? "" : "El campo es requerido."
        if ('expiration_date' in fieldValues)
            temp.expiration_date = fieldValues.expiration_date ? "" : "El campo es requerido."
        if ('department_id' in fieldValues)
            temp.department_id = fieldValues.department_id ? "" : "El campo es requerido."
        if ('province_id' in fieldValues)
            temp.province_id = fieldValues.province_id ? "" : "El campo es requerido."

        setErrors({
            ...temp
        })

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

    // useEffect(() => {
    //     setIsActiveSalary(publicationSelected.a_tratar===1? false: true)
    // },[publicationSelected])

    useEffect(() => {
        getPeriodsList();
        getDepartments();
        getProvinces();
        getDistrics();
        dispatch(actions_Utils.getItemsOp())
    }, [])

    useEffect(() => {
        filterProvinces()
    }, [provinces])

    useEffect(() => {
        filterDistricts()
    }, [districts])

    const filterProvinces = () => {
        let filteredProvinces = provinces.filter(item => item.department_id == values.department_id);
        setProvincesList(filteredProvinces);
    }

    const filterDistricts = () => {
        let filteredDistricts = districts.filter(item => item.province_id == values.province_id);
        setDistrictsList(filteredDistricts);
    }

    const getPeriodsList = async () => {
        let response = await getPeriods();
        setPeriods(response.periods)
    }

    const getDepartments = async () => {
        await dispatch(actions_Utils.getDepartments())
    }

    const getProvinces = async () => {
        await dispatch(actions_Utils.getProvinces());
    }

    const getDistrics = async () => {
        await dispatch(actions_Utils.getDistricts());
    }

    const handleClickSave = () => {
        let valuesTemp = {...values}
        valuesTemp.description = JSON.stringify(values.description)
        valuesTemp.requirements = JSON.stringify(values.requirements)
        valuesTemp.rubro_id = values?.job_level_id;
        valuesTemp.period_id = values?.period;
        if (publicationSelected) {
            const params = { publication_id: publicationSelected.id, body: { status: 1, ...valuesTemp, a_tratar:isActiveSalary} }

            dispatch(updatePublication(params))
        } else {
            dispatch(savePublication({...valuesTemp,a_tratar:isActiveSalary}))
        }
        dispatch(getJobsInfo())
        goForward(false)
    }

    const handleExit = () => {
        setOpenConfirmationModal(false)
        goForward(false)
    }

    const handleChangeDepartments = (event) => {
        setValues({ ...values, province_id: "", district_id: "" })
        setDistrictsList([])
        const { value } = event.target
        let provincesTemp = provinces.filter((province) => province.department_id == value)
        setProvincesList(provincesTemp)
        handleInputChange(event)

    }

    const handleChangeProvinces = (event) => {
        setValues({ ...values, district_id: "" })
        const { value } = event.target
        let districtsTemp = districts.filter((district) => district.province_id == value)
        setDistrictsList(districtsTemp)
        handleInputChange(event)
    }

    const handleChangeCheckBox = (e) => {
        setIsActiveSalary(statePrev => !statePrev)
        if(e.target.checked){
            setValues({ ...values, salary: null })
        }else{
            setValues({ ...values, salary: "" })
        }
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        id="date"
                        fullWidth
                        type="date"
                        name="expiration_date"
                        label="Fecha de caducidad"
                        value={values.expiration_date}
                        onChange={handleInputChange}
                        error={errors.expiration_date ? true : false}
                        helperText={errors.expiration_date || "Programa la fecha fin de tu publicación"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: dateLocal
                        }}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        fullWidth
                        name="job_title"
                        label="Nombre del puesto"
                        value={values.job_title}
                        onChange={handleInputChange}
                        error={errors.job_title ? true : false}
                        helperText={errors.job_title}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Select
                        label="Rubro"
                        name="job_level_id"
                        value={values.job_level_id}
                        onChange={handleInputChange}
                        error={errors.job_level_id ? true : false}
                        helperText={errors.job_level_id}
                    >
                        {rubrosOp && rubrosOp.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <RichText 
                        label="Funciones del puesto"
                        name="description"
                        valueText={values.description}
                        handleInputChange={handleInputChange}
                        error={errors.description ? true : false}
                        helperText={errors.description}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <RichText 
                        label="Requisitos del puesto"
                        name="requirements"
                        valueText={values.requirements}
                        handleInputChange={handleInputChange}
                        error={errors.requirements ? true : false}
                        helperText={errors.requirements}
                    />
                    {/* <TextInput
                        fullWidth
                        id="outlined-multiline-static"
                        label="Requisitos del puesto"
                        multiline
                        rows={8}
                        variant="outlined"
                        name="requirements"
                        value={values.requirements}
                        onChange={handleInputChange}
                        error={errors.requirements ? true : false}
                        helperText={errors.requirements}
                    /> */}
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        fullWidth
                        name="address"
                        label="Direccion"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address ? true : false}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Select
                                name="department_id"
                                label="Departamento"
                                value={values.department_id}
                                onChange={(e) => handleChangeDepartments(e)}
                                error={errors.department_id ? true : false}
                                helperText={errors.department_id}
                            >
                                {departments && departments.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                name="province_id"
                                label="Provincia"
                                value={values.province_id}
                                onChange={(e) => handleChangeProvinces(e)}
                                error={errors.province_id ? true : false}
                                helperText={errors.province_id}
                            >
                                {provincesList && provincesList.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Select
                                name="district_id"
                                label="Distrito"
                                value={values.district_id}
                                onChange={handleInputChange}
                                error={errors.district_id ? true : false}
                                helperText={errors.district_id}
                            >
                                {districtsList.length > 0 && districtsList.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )}
                            </Select>

                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                fullWidth
                                name="salary"
                                label="Salario"
                                value={values.salary || ""}
                                onChange={handleInputChange}
                                onKeyPress={onlyNumbers}
                                error={errors.salary ? true : false}
                                helperText={errors.salary}
                                disabled={isActiveSalary}

                            />
                            <FormControlLabel control={<Checkbox name="isActiveSalary" size="small" checked={isActiveSalary} onChange={handleChangeCheckBox} />} label={
                                <Typography variant="body2" component="p">
                                    No mostrar salario en la publicación
                                </Typography>
                            } />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextInput
                                fullWidth
                                type="date"
                                name="from_date"
                                label="Fecha de inicio"
                                value={values.from_date}
                                onChange={handleInputChange}
                                error={errors.from_date ? true : false}
                                helperText={errors.from_date || "Fecha de inicio de labores"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: dateLocal
                                }}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                label="Periodo de permanencia"
                                name="period"
                                value={values.period}
                                onChange={handleInputChange}
                                error={errors.period ? true : false}
                                helperText={errors.period || "Tiempo ideal de permanencia en el puesto"}
                            >
                                {periods && periods.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', margin: "auto" }} >
                    <Button variant="outlined" size="large" onClick={() => setOpenConfirmationModal(true)}>CANCELAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" size="large" onClick={() => setOpenModal(true)} disabled={disabledButtonState}>GUARDAR</Button>
                </Grid>
                <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
                    <h3 id="simple-modal-title">{publicationSelected ? "¿Está seguro que desea guardar los cambios?" : "¿Esta seguro que desea publicar la vacante?"}</h3>
                    <Grid item xs={12}>
                        <Grid container spacing={3} className="justify-center">
                            <Grid item>
                                <Button variant="outlined" size="large" onClick={() => setOpenModal(false)}>NO</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="large" onClick={handleClickSave}>SI, GUARDAR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal open={openConfirmationModal} handleCloseModal={() => setOpenConfirmationModal(false)}>
                    <h3 id="simple-modal-title">Si sales ahora, se perderán los cambios. ¿Seguro que quieres salir?</h3>
                    <Grid item xs={12}>
                        <Grid container spacing={3} className="justify-center">
                            <Grid item>
                                <Button variant="outlined" size="large" onClick={() => setOpenConfirmationModal(false)}>CANCELAR</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="large" onClick={handleExit}>SALIR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
            </Grid>
        </Container>
    )
}
