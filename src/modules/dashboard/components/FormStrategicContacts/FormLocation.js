import React, { useState } from 'react'
import { Grid, MenuItem, makeStyles } from "@material-ui/core";
import { Button, Chip, Select, Location } from "../../../shared/components";
import { produce } from "immer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const initialValues = {
    department_id: "",
    province_id: "",
    district_id: "",
}

export default function FormLocation() {
    const classes = useStyles()
    const [districtName, setDistrictName] = useState("")
    const [chipData, setChipData] = useState([])

    const handleDelete = (chipToDelete) => () => {
        setChipData(currentArray => produce(currentArray, draft => {
            const index = draft.findIndex(chip => chip.key === chipToDelete.key)
            if (index !== -1) draft.splice(index, 1)
        }))
    };

    return (
        <Location>
            {
                (
                    values,
                    setValues,
                    errors,
                    isCompleted,
                    handleInputChange,
                    handleChangeDepartments,
                    handleChangeProvinces,
                    departments,
                    provincesList,
                    districtsList
                ) => {
                    const handleChangeSelectDistrict = (e) => {
                        handleInputChange(e)
                        const district = districtsList.find(item => item.id == e.target.value)
                        setDistrictName(district)
                    }

                    const handleAddChip = () => {
                        const newChip = { ...values, key: districtName.id, label: districtName.name }
                        setChipData([...chipData, newChip])
                        setValues(initialValues)
                    }

                    return (<Grid container spacing={2}>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <Select
                                name="district_id"
                                label="Distrito"
                                value={values.district_id}
                                onChange={handleChangeSelectDistrict}
                                error={errors.district_id ? true : false}
                                helperText={errors.district_id}
                            >
                                {districtsList.length > 0 && districtsList.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" size="large" variant="contained" onClick={handleAddChip} disabled={isCompleted}>AGREGAR</Button>
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
                    </Grid>)
                }
            }
        </Location>

    )
}
