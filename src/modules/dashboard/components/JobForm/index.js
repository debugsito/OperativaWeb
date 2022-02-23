import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Paper,
  makeStyles,
} from "@material-ui/core";

import {
  updatePublication,
  savePublication,
} from "../../../../store/actions/dashboard/dashboard.middleware";
import {
  Button,
  Checkbox,
  Select,
  Modal,
  Radio,
  RichText,
  TextInput,
  Typography,
  ToolTip,
} from "../../../shared/components";
import { TYPE_OF_CONTRACT, TYPE_PAYMENT } from "../../../shared/constants";
import { onlyNumbers } from "../../../shared/libs/validators";
import { actions_Utils } from "../../../../store/actions";
import { useForm } from "../../../hooks";
import { WarningBlackIcon } from "../../images";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "3rem",
    marginBottom: "2rem",
    boxShadow: "0px 4px 14px -5px #D0D4DF",
  },
}));

export default function JobForm({
  initialValues,
  initRoute,
  isEditing = null,
}) {
  console.log("initialValues",initialValues)
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const dateLocal = DateTime.local().toFormat("yyyy-LL-dd");
  const { departments, provinces, districts, rubrosOp, academicLevels, periods } = useSelector((state) => state?.utils);
  const [districtsList, setDistrictsList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [publicationHidden, setPublicationHidden] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isActiveSalary, setIsActiveSalary] = useState(initialValues.a_tratar);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("job_title" in fieldValues)
      temp.job_title = fieldValues.job_title ? "" : "El campo es requerido.";
    if ("rubro_id" in fieldValues)
      temp.rubro_id = fieldValues.rubro_id? "" : "El campo es requerido.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description[0]?.children[0]?.text
        ? ""
        : "El campo es requerido.";
    if ("requirements" in fieldValues)
      temp.requirements = fieldValues.requirements[0]?.children[0]?.text
        ? ""
        : "El campo es requerido.";
    if ("benefits" in fieldValues)
      temp.benefits = fieldValues.benefits[0]?.children[0]?.text
        ? ""
        : "El campo es requerido.";

    if (!isActiveSalary) {
      if ("salary" in fieldValues)
        temp.salary = fieldValues.salary ? "" : "El campo es requerido";
    }
    if ("expiration_date" in fieldValues)
      temp.expiration_date = fieldValues.expiration_date
        ? ""
        : "El campo es requerido.";
    if ("department_id" in fieldValues)
      temp.department_id = fieldValues.department_id
        ? ""
        : "El campo es requerido.";
    if ("province_id" in fieldValues)
      temp.province_id = fieldValues.province_id
        ? ""
        : "El campo es requerido.";
    if ("district_id" in fieldValues)
      temp.district_id = fieldValues.district_id
        ? ""
        : "El campo es requerido.";

    if ("type_contract" in fieldValues)
      temp.type_contract = fieldValues.type_contract
        ? ""
        : "El campo es requerido.";
    if ("type_pay" in fieldValues)
      temp.type_pay = fieldValues.type_pay ? "" : "El campo es requerido.";
    if ("vacantes" in fieldValues)
      temp.vacantes = fieldValues.vacantes ? "" : "El campo es requerido.";
    if ("postulants" in fieldValues)
      temp.postulants = fieldValues.postulants ? "" : "El campo es requerido.";
    if ("period_id" in fieldValues)
      temp.period_id = fieldValues.period_id ? "" : "El campo es requerido.";

    if (values.otherRequiriments === "si") {
      if ("gender" in fieldValues)
        temp.gender = fieldValues.gender ? "" : "El campo es requerido.";
      if ("edad_min" in fieldValues)
        temp.edad_min = fieldValues.edad_min ? "" : "El campo es requerido.";
      if ("edad_max" in fieldValues)
        temp.edad_max = fieldValues.edad_max ? "" : "El campo es requerido.";
      if ("type_time" in fieldValues)
        temp.type_time = fieldValues.type_time ? "" : "El campo es requerido.";
      if ("quantity" in fieldValues)
        temp.quantity = fieldValues.quantity ? "" : "El campo es requerido.";
      if ("level_education" in fieldValues)
        temp.level_education = fieldValues.level_education
          ? ""
          : "El campo es requerido.";
    }

    if ("isNameHidden" in fieldValues)
      temp.isNameHidden = fieldValues.isNameHidden
        ? ""
        : "El campo es requerido.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    disabledButtonState,
  } = useForm(initialValues, true, validate);

  useEffect(() => {
    dispatch(actions_Utils.getAllPeriods());
    dispatch(actions_Utils.getDepartments());
    dispatch(actions_Utils.getProvinces());
    dispatch(actions_Utils.getDistricts());
    dispatch(actions_Utils.getItemsOp());
    dispatch(actions_Utils.getAcademicLevels());
  }, []);

  useEffect(() => {
    filterProvinces();
  }, [provinces]);

  useEffect(() => {
    filterDistricts();
  }, [districts]);

  useEffect(() => {
    if(isEditing){
      setTypeOFContract()

    }
  },[initialValues.type_contract])

  function setTypeOFContract(){
    
  }

  const filterProvinces = () => {
    let filteredProvinces = provinces.filter(
      (item) => item.department_id == values.department_id
    );
    setProvincesList(filteredProvinces);
  };

  const filterDistricts = () => {
    let filteredDistricts = districts.filter(
      (item) => item.province_id == values.province_id
    );
    setDistrictsList(filteredDistricts);
  };

  const goForward = () => history.push(initRoute);

  const handleClickSave = () => {
    
    if (!disabledButtonState) {
      console.log("values 1",values)
      let valuesTemp = { ...values };
      valuesTemp.description = JSON.stringify(values.description);
      valuesTemp.requirements = JSON.stringify(values.requirements);
      valuesTemp.benefits = JSON.stringify(values.benefits);
      valuesTemp.publicationHidden = publicationHidden;
      if (isEditing) {
        console.log("values 2",values)
        const body = {
          publication_id: initialValues.id,
          body: { status: 1, ...valuesTemp, a_tratar: isActiveSalary },
        };
        dispatch(updatePublication(body));
        goForward();
      } else {
        console.log("values 3",values)
        console.log("valuesTemp",valuesTemp)
        dispatch(savePublication({ ...valuesTemp, a_tratar: isActiveSalary }));
        history.push(`${initRoute}/empleo-registrado`);
      }
    } else {
      console.log("values 4",values)
      validate();
      setOpenModal(false);
      return;
    }
  };

  const handleExit = () => {
    setOpenConfirmationModal(false);
    goForward();
  };

  const handleChangeDepartments = (event) => {
    setValues({ ...values, province_id: "", district_id: "" });
    setDistrictsList([]);
    const { value } = event.target;
    let provincesTemp = provinces.filter(
      (province) => province.department_id == value
    );
    setProvincesList(provincesTemp);
    handleInputChange(event);
  };

  const handleChangeProvinces = (event) => {
    setValues({ ...values, district_id: "" });
    const { value } = event.target;
    let districtsTemp = districts.filter(
      (district) => district.province_id == value
    );
    setDistrictsList(districtsTemp);
    handleInputChange(event);
  };

  const handleChangeCheckBox = (e) => {
    setIsActiveSalary((statePrev) => !statePrev);
    if (e.target.checked) {
      setValues({ ...values, salary: null });
    } else {
      setValues({ ...values, salary: "" });
    }
  };

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="secondary">
              Datos del aviso
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Ingresa los datos principales del aviso.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} className="justify-center">
            <FormControl variant="outlined" fullWidth>
              <Checkbox
                label={
                  <Typography variant="body2" component="p">
                    Ocultar identidad de la empresa
                  </Typography>
                }
                name="isNameHidden"
                checked={publicationHidden}
                onChange={() => setPublicationHidden((prevState) => !prevState)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Select
                  label="Rubro"
                  name="rubro_id"
                  value={values.rubro_id}
                  onChange={handleInputChange}
                  error={errors.rubro_id ? true : false}
                  helperText={errors.rubro_id}
                >
                  {rubrosOp &&
                    rubrosOp.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <RichText
              label="Funciones del puesto"
              name="description"
              valueText={values.description}
              handleInputChange={handleInputChange}
              error={errors.description ? true : false}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <RichText
              label="Requisitos del puesto"
              name="requirements"
              valueText={values.requirements}
              handleInputChange={handleInputChange}
              error={errors.requirements ? true : false}
              helperText={errors.requirements}
            />
          </Grid>
          <Grid item xs={12}>
            <RichText
              label="Beneficios"
              name="benefits"
              valueText={values.benefits}
              handleInputChange={handleInputChange}
              error={errors.benefits ? true : false}
              helperText={errors.benefits}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Select
                  label="Tipo de contrato"
                  name="type_contract"
                  value={values.type_contract}
                  onChange={handleInputChange}
                  error={errors.type_contract ? true : false}
                  helperText={errors.type_contract}
                >
                  {
                    TYPE_OF_CONTRACT.map(item => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  label="S/"
                  name="type_pay"
                  value={values.type_pay}
                  onChange={handleInputChange}
                  error={errors.type_pay ? true : false}
                  helperText={errors.type_pay}
                >
                  {
                    TYPE_PAYMENT.map(item => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item xs={4}>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isActiveSalary"
                      size="small"
                      checked={isActiveSalary}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label={
                    <Typography variant="body2" component="p">
                      No mostrar salario en la publicación
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Select
                  name="department_id"
                  label="Departamento"
                  value={values.department_id}
                  onChange={(e) => handleChangeDepartments(e)}
                  error={errors.department_id ? true : false}
                  helperText={errors.department_id}
                >
                  {departments &&
                    departments.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.name}
                      </MenuItem>
                    ))}
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
                  {provincesList &&
                    provincesList.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Select
                  name="district_id"
                  label="Distrito"
                  value={values.district_id}
                  onChange={handleInputChange}
                  error={errors.district_id ? true : false}
                  helperText={errors.district_id}
                >
                  {districtsList.length > 0 &&
                    districtsList.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  name="vacantes"
                  label="Vacantes disponibles"
                  value={values.vacantes}
                  onChange={handleInputChange}
                  error={errors.vacantes ? true : false}
                  helperText={errors.vacantes}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  name="postulants"
                  label="Postulantes a evaluar"
                  value={values.postulants}
                  onChange={handleInputChange}
                  error={errors.postulants ? true : false}
                  helperText={errors.postulants}
                />
              </Grid>

              <Grid item xs={1} className="align-items-center">
                <ToolTip title="Ingresa la cantidad de registrados a evaluar por la Inteligencia Artificial Operativa">
                  <img src={WarningBlackIcon} alt="icono" />
                </ToolTip>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Select
                  name="period_id"
                  label="Periodo de permanencia"
                  value={values.period_id}
                  onChange={handleInputChange}
                  error={errors.period_id ? true : false}
                  helperText={errors.period_id}
                >
                  {periods.length > 0 &&
                    periods.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  fullWidth
                  type="date"
                  name="expiration_date"
                  label="Fecha de caducidad"
                  value={values.expiration_date}
                  onChange={handleInputChange}
                  error={errors.expiration_date ? true : false}
                  helperText={
                    errors.expiration_date || "Fecha fin de tu publicación"
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: dateLocal,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              ¿Deseas agregar otros requisitos?
            </Typography>
            <Typography variant="body2">
              Ingresa los datos principales del aviso
            </Typography>
            <FormControl
              component="fieldset"
              error={errors.otherRequiriments ? true : false}
            >
              <RadioGroup
                row
                aria-label="otherRequiriments"
                name="otherRequiriments"
                value={values.otherRequiriments}
                onChange={handleInputChange}
              >
                <FormControlLabel value="si" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              <FormHelperText>{errors.otherRequiriments}</FormHelperText>
            </FormControl>
          </Grid>
          {values.otherRequiriments == "si" && ( // 1 === SI
            <>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Género</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Edad</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Select
                      label="Genero"
                      name="gender"
                      value={values.gender || ""}
                      onChange={handleInputChange}
                      error={errors.gender ? true : false}
                      helperText={errors.gender}
                    >
                      <MenuItem value={2}>Femenino</MenuItem>
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={3}>Otro</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <TextInput
                      fullWidth
                      name="edad_min"
                      label="Edad minima"
                      value={values.edad_min || ""}
                      onChange={handleInputChange}
                      onKeyPress={onlyNumbers}
                      error={errors.edad_min ? true : false}
                      helperText={errors.edad_min || "Ej. 18"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextInput
                      fullWidth
                      name="edad_max"
                      label="Edad máxima"
                      value={values.edad_max || ""}
                      onChange={handleInputChange}
                      onKeyPress={onlyNumbers}
                      error={errors.edad_max ? true : false}
                      helperText={errors.edad_max || "Ej. 30"}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">
                      Experiencia minima
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Educación</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Select
                      label="Selecciona"
                      name="type_time"
                      value={values.type_time || ""}
                      onChange={handleInputChange}
                      error={errors.type_time ? true : false}
                      helperText={errors.type_time || "Meses/años"}
                    >
                      <MenuItem value="contrato-11">Meses</MenuItem>
                      <MenuItem value="contrato-2">Años</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <TextInput
                      fullWidth
                      name="quantity"
                      label="Cantidad"
                      value={values.quantity || ""}
                      onChange={handleInputChange}
                      onKeyPress={onlyNumbers}
                      error={errors.quantity ? true : false}
                      helperText={errors.quantity}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      label="Selecciona"
                      name="level_education"
                      value={values.level_education || ""}
                      onChange={handleInputChange}
                      error={errors.level_education ? true : false}
                      helperText={errors.level_education}
                    >
                      {academicLevels.map((element) => (
                        <MenuItem key={element.id} value={element.id}>
                          {element.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
        <h3 id="simple-modal-title">
          {initialValues?.id
            ? "¿Está seguro que desea guardar los cambios?"
            : "¿Esta seguro que desea publicar la vacante?"}
        </h3>
        <Grid item xs={12}>
          <Grid container spacing={3} className="justify-center">
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setOpenModal(false)}
              >
                NO
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={handleClickSave}
              >
                SI, GUARDAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        open={openConfirmationModal}
        handleCloseModal={() => setOpenConfirmationModal(false)}
      >
        <h3 id="simple-modal-title">
          Si sales ahora, se perderán los cambios. ¿Seguro que quieres salir?
        </h3>
        <Grid item xs={12}>
          <Grid container spacing={3} className="justify-center">
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setOpenConfirmationModal(false)}
              >
                CANCELAR
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" onClick={handleExit}>
                SALIR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>

      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setOpenConfirmationModal(true)}
          >
            CANCELAR
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenModal(true)}
          >
            CONTINUAR
          </Button>{" "}
          {/*  disabled={disabledButtonState} */}
        </Grid>
      </Grid>
    </div>
  );
}
