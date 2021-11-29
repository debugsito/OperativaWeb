import React from 'react'
import { FormControl, FormControlLabel, Grid, RadioGroup, FormLabel } from '@material-ui/core';
import { Radio } from '../../../shared/components';

export default function InputPersonal({values,handleInputChange}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>1. ¿Si no está contento con una situación puede decirlo?</FormLabel>
                    <RadioGroup row aria-label="¿Si no está contento con una situación puede decirlo?" name="questionPersonalOne" value={values.questionPersonalOne} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>2. ¿Se considera una persona responsable?</FormLabel>
                    <RadioGroup row aria-label="¿Se considera una persona responsable?" name="questionPersonalTwo" value={values.questionPersonalTwo} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>3. ¿Le motiva trabajar como operario?</FormLabel>
                    <RadioGroup row aria-label="¿Le motiva trabajar como operario?" name="questionPersonalThree" value={values.questionPersonalThree} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>4. ¿Cuanto toma decisiones suele cambiar de parecer a cada momento?</FormLabel>
                    <RadioGroup row aria-label="¿Cuanto toma decisiones suele cambiar de parecer a cada momento?" name="questionPersonalFour" value={values.questionPersonalFour} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>5. ¿Tuvo problemas alguna vez con compañeros o jefes?</FormLabel>
                    <RadioGroup row aria-label="¿Tuvo problemas alguna vez con compañeros o jefes?" name="questionPersonalFive" value={values.questionPersonalFive} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>6. ¿Prefiere trabajar solo o en grupo?</FormLabel>
                    <RadioGroup row aria-label="6. ¿Prefiere trabajar solo o en grupo?" name="questionPersonalSix" value={values.questionPersonalSix} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            
        </Grid>
    )
}
