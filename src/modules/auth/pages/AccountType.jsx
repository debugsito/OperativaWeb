import React, { useState } from 'react';
import '../styles/AccountType.css'

import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Typography } from '@material-ui/core';
import { Button, Radio } from '../../shared/components';
import { useDispatch } from 'react-redux';
import { setAccountType } from '../../../store/actions/auth/auth.action';

const AccountType = ({ history }) => {
    const dispatch = useDispatch()
    const [type, setType] = useState({value: '', name: ''});

    const handleChange = (event) => {
        setType({
            value: event.target.value,
            name: (event.target.name).toLowerCase()
        });
    };

    const handleAccept = () => {
        dispatch(setAccountType(type.value));
        history.push(`/${type.name}/registro`,{type:type.value})
    }

    const goBack = () => {
        history.goBack()
    }

    return (
        <Grid container direction="row" spacing={0} justify="center" alignItems="center" className="account-type-container" style={{ height: "100%" }}>
            <Grid item justify="center">
                <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                    <Grid xs={12} item className="account-type-form">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                <Typography variant="h4" component="h4">
                                    Cuéntanos
                                </Typography>
                            </FormLabel>
                            <FormLabel component="legend">
                                <Typography variant="body1" component="p">
                                    ¿Para quién desea crear la cuenta?
                                </Typography>
                            </FormLabel>
                            <RadioGroup aria-label="accountType" value={type?.value} onChange={handleChange}>
                                <FormControlLabel value="company" name="empresa" control={<Radio />} label="Empresa" />
                                <FormControlLabel value="municipality" name="municipalidad" control={<Radio />} label="Municipalidad" />
                                <FormControlLabel value="applicant" name="postulante" control={<Radio />} label="Postulante" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid xs={12} item className="account-type-button-container">
                        <Button variant="outlined" size="large" onClick={goBack}>cancelar</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="contained" size="large" onClick={handleAccept}>aceptar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AccountType;