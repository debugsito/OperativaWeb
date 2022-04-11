import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, MenuItem } from "@material-ui/core";
import { NavigateBefore } from '@material-ui/icons';
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import '../styles/postulate-form.css'
import { AutocompleteTemp, Button, TextInput } from '../../shared/components';
import { itemsList } from '../../../store/services/utils.service';
import { Select, FormControl, InputLabel } from '@material-ui/core';
import { useForm } from "../../hooks";
import * as moment from 'moment';
import { useDispatch } from "react-redux";
import { arrow } from '../../shared/images/postulant/index'
import { getPublicationSearch } from "../../../store/actions/applicant/applicant.action";



const PostulateForm = () => {
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const [hasResult, setHasResult] = useState(false);
    const [rubros, setRubros] = useState([]);
    // const classes = useStyles();
    const dispatch = useDispatch();
    const [fechas, setFechas] = useState([
        { value: moment().format('YYYY-MM-DD 00:00:00'), name: 'Hoy' },
        { value: moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Ayer' },
        { value: moment().subtract(3, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 3 días' },
        { value: moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 7 días' },
        { value: moment().subtract(15, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 15 días' },
        { value: moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 30 días' },
    ]);
    // const [results, setResults] = useState([]);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm({
        word_search: '',
        district: null,
        rubro_id: '',
        createdAt: '',
    });

    const handleSubmit = async () => {
        // console.log(values)
        dispatch(getPublicationSearch({
            'word_search': values?.word_search,
            'district_id': values?.district?.id,
            'rubro_id': values?.rubro_id,
            'createdAt': values?.createdAt,
        }))
        history.push(`${initRoute}/formulario-postular/info`)
    }

    const setBefore = () => {
        history.push(`${initRoute}/postulante`)
    };

    useEffect(() => {
        getRubros();
    }, []);

    const getRubros = async () => {
        const response = await itemsList();
        setRubros(response?.rubros);
    };

    return (
        <Container className="applicant-container">
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <img src={arrow} alt="" onClick={setBefore} />
                </Grid>
                <Grid item xs={12} className="mb-2">
                    <div>
                        <Grid item xs={12} className="mb-2">
                            <h4 className="title">Busca el trabajo que se adapte a tu perfil.</h4>
                        </Grid>
                        <div className="container-postulate-form">
                            <form>
                                <Grid item xs={12} className="mb-2">
                                    <TextInput
                                        fullWidth
                                        onChange={handleInputChange}
                                        value={values.word_search}
                                        name="word_search"
                                        label="Puesto, empresa o palabra clave"

                                    />
                                </Grid>
                                <Grid item xs={12} className="mb-2">
                                    <AutocompleteTemp
                                        label="Distrito"
                                        value={values.district}
                                        name="district"
                                        handleChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} className="mb-2">
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="rubro-label">Rubro</InputLabel>
                                        <Select
                                            labelId="rubro-label"
                                            value={values.rubro_id}
                                            name="rubro_id"
                                            onChange={handleInputChange}
                                            label="Rubro">
                                            <MenuItem value="">
                                                <em>Selecciona una opción</em>
                                            </MenuItem>
                                            {
                                                (rubros.map((item, i) => {
                                                    return <MenuItem key={item.id}
                                                        value={item.id}>{item.name}</MenuItem>
                                                }))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className="mb-2">
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="fecha-publicacion-label">Fecha de publicación</InputLabel>
                                        <Select
                                            labelId="fecha-publicacion-label"
                                            value={values.createdAt}
                                            name="createdAt"
                                            onChange={handleInputChange}
                                            label="Fecha de publicación">
                                            <MenuItem value="">
                                                <em>Selecciona una opción</em>
                                            </MenuItem>
                                            {
                                                (fechas.map((item, i) => {
                                                    return <MenuItem key={i}
                                                        value={item.value}>{item.name}</MenuItem>
                                                }))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className="mb-2 grid-button">
                                    <Button fullWidth variant="contained" color="secondary" size="large" className="buttonSearch"
                                        onClick={handleSubmit}>
                                        Buscar
                                    </Button>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PostulateForm;
