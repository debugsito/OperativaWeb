import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FormControl, IconButton, FormHelperText, FormControlLabel, Grid, Radio, RadioGroup, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Button } from '../../../shared/components';
import { useForm } from "../../../hooks/useForm"
import { Visibility, VisibilityOff } from '@material-ui/icons';


const initialValues = {
    password: '',
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const randValue = rand();
    const top = 50 + randValue;
    const left = 50 + randValue;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        outline: 'none'
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 10
    },
    button: {
        marginTop: 5
    }
}));

export default function SimpleModal({ handleCloseModal, executeAction, ...props }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [option, setOption] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setOption(e.target.value)
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "El campo es requerido."
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


    const handleSave = () => {
        const { password } = values;
        if (option == "accept") {
            executeAction(password);
        } else {
            handleCloseModal();
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">¿Deseas eliminar a los usarios seleccionados?</h3>
            <FormControl component="fieldset" fullWidth={true}>
                <Grid container spacing={3} style={{ padding: 10 }}>
                    <Grid item xs={12} justify="center">
                        <RadioGroup aria-label="option" name="option" value={option} onChange={handleChange} row>
                            <FormControlLabel value="accept" control={<Radio />} label="Aprobar" />
                            <FormControlLabel value="deny" control={<Radio />} label="Rechazar" />
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12} justify="center">
                        <p>Por seguridad ingresa tu contraseña para continuar.</p>
                        <FormControl className="sign-in__input-container" variant="outlined" fullWidth error={errors.password ? true : false}>
                            <InputLabel htmlFor="outlined-password" >Ingrese contraseña</InputLabel>
                            <OutlinedInput
                                name="password"
                                id="outlined-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleInputChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            id="outlined-password-icon"
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={127}
                            />
                            <FormHelperText>{errors.password}</FormHelperText>
                        </FormControl>

                    </Grid>

                </Grid>
            </FormControl>
            <Grid container spacing={3} direction="row" justify="center" className={classes.button}>
                <Grid item >
                    <Button variant="outlined" onClick={handleCloseModal}>CANCELAR</Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" onClick={handleSave} disabled={(option == "" ? true : false) || disabledButtonState}>ACEPTAR</Button>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <div>
            <Modal
                // open={open}
                // onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                {...props}
            >
                {body}
            </Modal>
        </div>
    );
}
