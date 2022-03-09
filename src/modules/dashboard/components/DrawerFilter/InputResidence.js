import React, { useState } from "react";
import { MenuItem, Grid, makeStyles } from "@material-ui/core";
import { Button, Chip, Select, Location } from "../../../shared/components";
import { produce } from "immer";
import { useController, useFormContext } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
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
};

function InputResidence() {
  const methods = useFormContext();
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: "residence.answers",
    control: methods.control,
    defaultValues: [],
  });
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [districtName, setDistrictName] = useState("");

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    setChipData((currentArray) =>
      produce(currentArray, (draft) => {
        const index = draft.findIndex((chip) => chip.key === chipToDelete.key);
        if (index !== -1) draft.splice(index, 1);
      })
    );
    onChange(value.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Location>
      {(
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
          handleInputChange(e);
          const district = districtsList.find(
            (item) => item.id == e.target.value
          );
          setDistrictName(district);
        };

        const handleAddChip = () => {
          const newChip = {
            ...values,
            key: districtName.id,
            label: districtName.name,
          };
          setChipData([...chipData, newChip]);
          setValues(initialValues);
          onChange([...chipData, newChip]);
        };
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Select
                label="Departamento"
                name="department_id"
                value={values.department_id}
                onChange={handleChangeDepartments}
              >
                {departments.length > 0 &&
                  departments.map((element) => (
                    <MenuItem key={element.id} value={element.id}>
                      {element.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                size="small"
                label="Provincia"
                name="province_id"
                value={values.province_id}
                onChange={handleChangeProvinces}
              >
                {provincesList.length > 0 &&
                  provincesList.map((element) => (
                    <MenuItem key={element.id} value={element.id}>
                      {element.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Distrito"
                name="district_id"
                value={values.district_id}
                onChange={handleChangeSelectDistrict}
              >
                {districtsList.length > 0 &&
                  districtsList.map((element) => (
                    <MenuItem key={element.id} value={element.id}>
                      {element.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={handleAddChip}
                disabled={isCompleted}
              >
                AGREGAR
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div component="ul" className={classes.root}>
                {value.map((data) => {
                  return (
                    <li key={data.key}>
                      <Chip
                        label={data.label}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        );
      }}
    </Location>
  );
}

export default InputResidence;
