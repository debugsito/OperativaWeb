import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuItem, Grid, makeStyles } from '@material-ui/core'
import { Button, Chip, Select } from '../../../shared/components'
import { getDepartments, getProvinces, getDistricts } from '../../../../store/actions/utils/utils.action';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function InputResidence({ values, handleInputChange, setValues }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const [provincesList, setProvincesList] = useState([])
    const [districtsList, setDistrictsList] = useState([])
    const [chipData, setChipData] = useState([])

    useEffect(() => {
        dispatch(getDepartments())
        dispatch(getProvinces())
        dispatch(getDistricts())
    }, [])

    useEffect(() => {
        if (departments.length > 0) {
            setFilteredProvinces(values.department_id)
        }
    }, [departments])

    useEffect(() => {
        if (provinces.length > 0) {
            setFilteredDistricts(values.province_id)
        }
    }, [provinces])

    const setFilteredProvinces = (department_id) => {
        setDistrictsList([]);
        setProvincesList([]);
        const filteredProvinces = provinces.filter(item => item.department_id == department_id);
        setProvincesList(filteredProvinces);
    }

    const setFilteredDistricts = function (province_id) {
        setDistrictsList([]);
        let filteredDistricts = districts.filter(item => item.province_id == province_id);
        setDistrictsList(filteredDistricts);
    }

    const handleChangeSelectDepartment = (e) => {
        const departmen_id = e.target.value
        setValues({ ...values, district_id: "", province_id: "" })
        handleInputChange(e)
        setFilteredProvinces(departmen_id);
    }

    const handleChangeSelectProvince = (e) => {
        setValues({ ...values, district_id: "" })
        handleInputChange(e)
        setFilteredDistricts(e.target.value);
    }

    const handleDelete = (chipToDelete) => () => {
        // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    label="Departamento"
                    name="department_id"
                    value={values.department_id}
                    onChange={handleChangeSelectDepartment}
                >
                    {departments.length > 0 && departments.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select
                    size="small"
                    label="Provincia"
                    name="province_id"
                    value={values.province_id}
                    onChange={handleChangeSelectProvince}
                >
                    {provincesList.length > 0 && provincesList.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select
                    label="Distrito"
                    name="district_id"
                    value={values.district_id}
                    onChange={handleInputChange}
                >
                    {districtsList.length > 0 && districtsList.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Button color="secondary" size="large" variant="contained">AGREGAR</Button>
            </Grid>
            <Grid item xs={12}>
                <div component="ul" className={classes.root}>
                    {
                        chipData.map((data) => {
                            return (
                                <li key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onDelete={handleDelete(data)}
                                        className={classes.chip}
                                    />
                                </li>
                            );
                        })
                    }
                </div>
            </Grid>

        </Grid>
    )
}

export default InputResidence
