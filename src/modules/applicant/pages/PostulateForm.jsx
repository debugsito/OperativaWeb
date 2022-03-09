import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Container, Grid, MenuItem} from "@material-ui/core";
import {NavigateBefore} from '@material-ui/icons';
import {SessionRoutes} from "../../shared/libs/sessionRoutes";
import '../styles/postulate-form.css'
import {AutocompleteTemp, Button, TextInput} from '../../shared/components';
import ApplicantResultsPostulateForm from '../components/ApplicantPostulateForm/ApplicantResultsPostulateForm';
import {itemsList} from '../../../store/services/utils.service';
import {Select, FormControl, InputLabel} from '@material-ui/core';
import {useForm} from "../../hooks";
import * as moment from 'moment';
import {service_Applicant} from "../../../store/services";

const PostulateForm = () => {
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const [hasResult, setHasResult] = useState(false);
    const [rubros, setRubros] = useState([]);
    const [fechas, setFechas] = useState([
        {value: moment().format('YYYY-MM-DD 00:00:00'), name: 'Hoy'},
        {value: moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Ayer'},
        {value: moment().subtract(3, 'years').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 3 días'},
        {value: moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 7 días'},
        {value: moment().subtract(15, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 15 días'},
        {value: moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'), name: 'Últimos 30 días'},
    ]);
    const [results, setResults] = useState([]);

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
        const response = await service_Applicant.publicationsSearch({
            'word_search': values.word_search,
            'district_id': values.district.id,
            'rubro_id': values.rubro_id,
            'createdAt': values.createdAt,
        });
        setResults(response.data.publications);
        setHasResult(true);
    }

    const setBefore = () => {
        if (hasResult) {
            setHasResult(false);
        } else {
            history.push(`${initRoute}/postulante`)
        }
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
                    <a className="btn-logout">
                        <NavigateBefore onClick={setBefore}/>
                    </a>
                </Grid>
                <Grid item xs={12} className="mb-2">
                    {!hasResult ?
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
                                    <Grid item xs={12} className="mb-2">
                                        <Button fullWidth variant="contained" color="secondary" size="large"
                                                onClick={handleSubmit}>
                                            Buscar
                                        </Button>
                                    </Grid>
                                </form>
                            </div>
                        </div>
                        :
                        <div className="container-result-postulate-form">
                            <Grid item xs={12} className="mb-2">
                                <h4 className="title">Resultados</h4>
                            </Grid>
                            <Grid item xs={12} className="mb-2">
                                {
                                    (results.map((item, i) => {
                                        return <ApplicantResultsPostulateForm data={item} key={item.id}/>;
                                    }))
                                }
                            </Grid>
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default PostulateForm;
