


import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Divider, Typography } from '@material-ui/core';
import { Select, Button, TextInput, Snackbars,Modal } from '../../../shared/components';
import { civilStatusesList, departmentsList, districtsList, provincesList } from '../../../../store/services/utils.service';
import { onlyNumbers, isPhone, onlyLetters, isRuc, isDni } from '../../../shared/libs/validators';
import { useForm } from "../../../hooks/useForm";
import PROVIDERS from "../../../global/constants/types/providers";
import DOCUMENT_TYPE from "../../../global/constants/types/documentsTypes";
import { documentsTypeList, providerList } from '../../../../store/services/utils.service';
import { actions_Utils } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';

const defaultValues = {
    first_name: "",
    last_name: "",
    document_id: "",
    document_number: "",
    birth_date: "",
    gender: "",
    provider_id: "",
    providerSpecification: null,
    department_id: "",
    province_id: "",
    district_id: "",
    address: "",
    reference: "",
    phone: "",
    civil_id: "",
    interest_rubro_id: ""
}

const DEPARTMENT = {
    CALLAO: 7
}
const PROVINCE = {
    CALLAO: 701
}

const useStyle = makeStyles(theme => ({
    defaultButton: {
        backgroundColor : 'white',
        color: 'black',
        border : 'solid 1px',
        borderColor : 'black',
        "&:hover": {
            background: "white"
        },
        marginRight :'1.5rem'
    },
    defaultRadios : {
        borderRadius :'30px'
    }
}))




export default function PersonalDataForm({ user, handleSavePersonalData,setOption }) {

    let initialValues = user ? user : defaultValues;
    const dispatch = useDispatch()
    const yearMax = DateTime.utc().year - 18
    const monthMax = DateTime.utc().month
    const dayMax = DateTime.utc().day
    const dateMax = DateTime.utc(yearMax, monthMax, dayMax).toFormat("yyyy-LL-dd")
    const { items } = useSelector(state => state.utils)
    const [openAlert, setOpenAlert] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const classes = useStyle()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('birth_date' in fieldValues)
            temp.birth_date = fieldValues.birth_date ? "" : "El campo es requerido."
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "El campo es requerido."
        if ('gender' in fieldValues)
            temp.gender = fieldValues.gender ? "" : "El campo es requerido."
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "El campo es requerido."
        if ('document_id' in fieldValues)
            temp.document_id = fieldValues.document_id ? "" : "El campo es requerido."
        if ('document_number' in fieldValues) {
            if (values.document_id === 1) {
                temp.document_number = fieldValues.document_number ? (isDni(fieldValues.document_number) ? "" : "Numero de DNI inválido") : "El campo es requerido."
            } else {
                temp.document_number = fieldValues.document_number ? "" : "El campo es requerido."
            }
        }
        if ('provider_id' in fieldValues)
            temp.provider_id = fieldValues.provider_id ? "" : "El campo es requerido."
        if ('department_id' in fieldValues)
            temp.department_id = fieldValues.department_id ? "" : "El campo es requerido."
        if ('province_id' in fieldValues)
            temp.province_id = fieldValues.province_id ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "El campo es requerido."
        if ('reference' in fieldValues)
            temp.reference = fieldValues.reference ? "" : "El campo es requerido."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? (isPhone(fieldValues.phone) ? "" : "Ingrese un numero de teléfono/celular válido") : "El campo es requerido."
        if ('civil_id' in fieldValues)
            temp.civil_id = fieldValues.civil_id ? "" : "El campo es requerido."
        if ('interest_rubro_id' in fieldValues)
            temp.interest_rubro_id = fieldValues.interest_rubro_id ? "" : "El campo es requerido."


        if (showProviderSpecification) {
            if ('providerSpecification' in fieldValues)
                temp.providerSpecification = fieldValues.providerSpecification ? "" : "El campo es requerido."
        }

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

    const [providers, setProviders] = useState([]);
    const [documentsType, setDocumentsType] = useState([]);
    const [showProviderSpecification, setShowProviderSpecification] = useState(false)
    const [civilStatuses, setCivilStatuses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [baseProvinces, setBaseProvinces] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [baseDistricts, setBaseDistricts] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getProviderList();
        getDocumentsTypeList();
        getCivilStatuses();
        getDepartmentsList();
        getProvincesList();
        getDistrictsList();
        dispatch(actions_Utils.getItems())
    }, []);

    useEffect(() => {
        getFilteredProvinces(values.department_id);
    }, [baseProvinces])

    useEffect(() => {
        getFilteredDistricts(values.province_id);
    }, [baseDistricts])

    useEffect(() => {
        if (values.department_id !== "") {
            if (values.department_id === DEPARTMENT.CALLAO) {
                const e = { target: { name: "", value: "" } }
                e.target.name = "province_id"
                e.target.value = PROVINCE.CALLAO
                handleChangeSelectProvince(e)
            }
        }
    }, [values.department_id])

    const handleChangeSelectDepartment = (e) => {
        const departmen_id = e.target.value
        setValues({ ...values, district_id: "", province_id: "" })
        handleInputChange(e)
        getFilteredProvinces(departmen_id);
    }

    const handleChangeSelectProvince = (e) => {
        setValues({ ...values, district_id: "" })
        handleInputChange(e)
        getFilteredDistricts(e.target.value);
    }

    const getCivilStatuses = async () => {
        const response = await civilStatusesList();
        setCivilStatuses(response?.civils);
    }

    const getDepartmentsList = async () => {
        const response = await departmentsList();
        setDepartments(response?.departments);
    }

    const getProvincesList = async () => {
        const response = await provincesList();
        setBaseProvinces(response?.provinces);
    }

    const getDistrictsList = async () => {
        const response = await districtsList();
        setBaseDistricts(response?.districts);
    }

    const getFilteredProvinces = (value) => {
        setProvinces([]);
        setDistricts([]);

        let filteredProvinces = baseProvinces.filter(item => item.department_id == value);
        setProvinces(filteredProvinces);
    }

    const getFilteredDistricts = function (value) {
        setDistricts([]);
        let filteredDistricts = baseDistricts.filter(item => item.province_id == value);
        setDistricts(filteredDistricts);
    }


    const getProviderList = async () => {
        const response = await providerList();
        setProviders(response?.providers);
    }

    const getDocumentsTypeList = async () => {
        const response = await documentsTypeList();
        let documentTypeTemp = response?.documents.filter(documentType => documentType.id != DOCUMENT_TYPE.RUC_ID)
        setDocumentsType(documentTypeTemp);
    }

    function handleSelectTypeDocument(e) {
        setValues(prevValues => ({
            ...prevValues,
            document_number: ""
        }))
        handleInputChange(e);
    }

    const handleSelectProvider = (e) => {
        const option = e.target.value;
        if (option === PROVIDERS.OTHER || option === PROVIDERS.MUNICIPALITY_ID) {//otros y municipalidad
            setShowProviderSpecification(true)
            setValues({ ...values, providerSpecification: '' })
        } else {
            setShowProviderSpecification(false)
            setValues({ ...values, providerSpecification: null })
            setErrors({ ...errors, providerSpecification: '' })
        }
        handleInputChange(e);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleClickFinish = (option) => {
        if (!disabledButtonState) {
            setOption(option)
            setOpenModal(true)
        } else {
            validate();
            setOpenAlert(true)
            return
        }
    }


    const handleSave = () => {
        if (!disabledButtonState) {
            let data = { ...values, country_id: 1 }
            handleSavePersonalData(data)
            setOpenModal(false)
        } else {
            validate(values);
            setOpenAlert(true)
            return
        }
    }

    const bodyModal = (
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="body1">La creación de tu CV se ha realizado con éxito. ¿Deseas guardar tu CV?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setOpenModal(false)}>CANCELAR</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleSave}>GUARDAR</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    // #endregion
    return (
        <>
            <Grid item xs={6}>
                <Typography variant="h6" component="h6">
                    <strong>Datos Peronales</strong>
                </Typography>
            </Grid>
            <Grid container spacing={3} style={{ padding: 20 }}>
                <Grid item xs={12} md={6}>
                    <TextInput
                        fullWidth
                        label="Nombres"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleInputChange}
                        error={errors.first_name ? true : false}
                        helperText={errors.first_name}
                        onKeyPress={e => onlyLetters(e)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput
                        fullWidth
                        label="Apellidos"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleInputChange}
                        error={errors.last_name ? true : false}
                        helperText={errors.last_name}
                        onKeyPress={e => onlyLetters(e)}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl variant="outlined" fullWidth error={errors.document_id ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Tipo doc.</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="document_id"
                            value={values.document_id}
                            onChange={(e) => handleSelectTypeDocument(e)}
                            label="Tipo doc."
                        >
                            {documentsType.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.document_id}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextInput
                        fullWidth
                        label="Nro. de doc"
                        name="document_number"
                        value={values.document_number}
                        onChange={handleInputChange}
                        error={errors.document_number ? true : false}
                        // maxLength='12'
                        // minLength='8'
                        // type="Number"
                        helperText={errors.document_number}
                        onKeyPress={e => onlyNumbers(e)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput
                        id="date"
                        fullWidth
                        type="date"
                        name="birth_date"
                        label="Fecha de nacimiento"
                        value={values.birth_date}
                        onChange={handleInputChange}
                        error={errors.birth_date ? true : false}
                        helperText={errors.birth_date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: dateMax
                        }}
                    />

                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth error={errors.gender ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Género</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            label="Género"
                        >
                            <MenuItem value={2}>Femenino</MenuItem>
                            <MenuItem value={1}>Masculino</MenuItem>
                            <MenuItem value={3}>Otro</MenuItem>
                        </Select>
                        <FormHelperText>{errors.gender}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {/* <Divider /> */}
                    <InputLabel id="demo-simple-select-outlined-label">¿Cómo te enteraste de Operativa?</InputLabel>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* <InputLabel id="demo-simple-select-outlined-label">¿Cómo te enteraste de Operativa?</InputLabel> */}
                    <FormControl variant="outlined" fullWidth error={errors.provider_id ? true : false}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="provider_id"
                            value={values.provider_id}
                            onChange={(e) => handleSelectProvider(e)}
                            label="Seleciona"
                        >
                            {providers.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.provider_id}</FormHelperText>
                    </FormControl>
                </Grid>
                {
                    showProviderSpecification &&
                    <Grid item xs={12} md={6}>
                        <TextInput
                            fullWidth
                            label="Por favor, especifíque"
                            name="providerSpecification"
                            value={values.providerSpecification || ''}
                            onChange={handleInputChange}
                            error={errors.providerSpecification ? true : false}
                            helperText={errors.providerSpecification}
                        />
                    </Grid>
                }
                {/* <Grid item xs={12} md={12} className="justify-end">
                    <Button variant="contained" size="large" onClick={handleSave}>Siguiente</Button>
                </Grid> */}
                {/* <Snackbars
                    open={openAlert}
                    onClose={handleCloseAlert}
                /> */}
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" component="h6">
                    <strong>Datos del contacto</strong>
                </Typography>
            </Grid>
            <Grid container spacing={3} style={{ padding: 20 }}>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth error={errors.department_id ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="department_id"
                            value={values.department_id}
                            onChange={(e) => handleChangeSelectDepartment(e)}
                            label="Departamento"
                        >
                            {departments.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.department_id}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth error={errors.province_id ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Provincia</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="province_id"
                            value={values.province_id}
                            onChange={(e) => handleChangeSelectProvince(e)}
                            label="Provincia"
                            disabled={!values.department_id}
                        >
                            {provinces.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.province_id}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth error={errors.district_id ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Distrito</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="district_id"
                            value={values.district_id}
                            onChange={handleInputChange}
                            label="Distrito"
                            disabled={!values.province_id}
                        >
                            {districts.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.district_id}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput
                        fullWidth
                        label="Dirección"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address ? true : false}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput
                        fullWidth
                        name="reference"
                        label="Referencia"
                        value={values.reference}
                        onChange={handleInputChange}
                        error={errors.reference ? true : false}
                        helperText={errors.reference}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput
                        fullWidth
                        label="Celular/Teléfono"
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone ? true : false}
                        helperText={errors.phone}
                        onKeyPress={e => onlyNumbers(e)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth error={errors.civil_id ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Estado civil</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="civil_id"
                            value={values.civil_id}
                            onChange={handleInputChange}
                            label="Estado civil"
                        >
                            {civilStatuses.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.civil_id}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* <Snackbars
                    open={openAlert}
                    onClose={handleCloseAlert}
                /> */}
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" component="h6">
                    <strong>Interés</strong>
                </Typography>
            </Grid>
            <Grid container spacing={3} style={{ padding: 20 }}>
                <Grid item xs={12} md={6}>
                    <Select
                        label="Rubro de interés"
                        name="interest_rubro_id"
                        value={values.interest_rubro_id}
                        onChange={handleInputChange}
                        error={errors.interest_rubro_id ? true : false}
                        helperText={errors.interest_rubro_id}
                    >
                        {items.length > 0 && items.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}

                    </Select>
                </Grid>

            </Grid>
            <Grid item xs={12} md={12} className="justify-end">
                <Button className={classes.defaultButton +" "+classes.defaultRadios} variant="contained" size="large" onClick={(e)=> handleClickFinish(1)}>Salir y Guardar</Button>
                <Button className={classes.defaultRadios}  variant="contained" size="large" onClick={(e) => handleClickFinish(2)}>Siguiente</Button>
            </Grid>
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
                {bodyModal}
            </Modal>
            <Snackbars
                open={openAlert}
                onClose={handleCloseAlert}
            />

        </>
    );

}