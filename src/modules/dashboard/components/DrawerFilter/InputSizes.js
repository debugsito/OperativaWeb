import React from "react";
import { FormGroup, Grid, Typography } from "@material-ui/core";
import { Checkbox } from "../../../shared/components";
import FormController from "../../../shared/formControllers";

export default function InputSizes() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>
                    Talla de camisa
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormController
                        type="checkbox"
                        label="XS"
                        name="shirt_size.answers.XS.active"
                    />
                    <FormController
                        type="checkbox"
                        label="S"
                        name="shirt_size.answers.S.active"
                    />
                    <FormController
                        type="checkbox"
                        label="M"
                        name="shirt_size.answers.M.active"
                    />
                    <FormController
                        type="checkbox"
                        label="L"
                        name="shirt_size.answers.L.active"
                    />
                    <FormController
                        type="checkbox"
                        label="XL"
                        name="shirt_size.answers.XL.active"
                    />
                    <FormController
                        type="checkbox"
                        label="XXL"
                        name="shirt_size.answers.XXL.active"
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Talla de pantalón
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormController
                        type="checkbox"
                        label="XS"
                        name="pants_size.answers.XS.active"
                    />
                    <FormController
                        type="checkbox"
                        label="S"
                        name="pants_size.answers.S.active"
                    />
                    <FormController
                        type="checkbox"
                        label="M"
                        name="pants_size.answers.M.active"
                    />
                    <FormController
                        type="checkbox"
                        label="L"
                        name="pants_size.answers.L.active"
                    />
                    <FormController
                        type="checkbox"
                        label="XL"
                        name="pants_size.answers.XL.active"
                    />
                    <FormController
                        type="checkbox"
                        label="XXL"
                        name="pants_size.answers.XXL.active"
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Talla de calzado
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormController
                    type="input"
                    fullWidth
                    label="Desde"
                    variant="outlined"
                    name="shoe_size.answers.from"
                    helperText="Ejemplo: 40"
                />
            </Grid>
            <Grid item xs={6}>
                <FormController
                    type="input"
                    fullWidth
                    label="Hasta"
                    variant="outlined"
                    name="shoe_size.answers.to"
                    helperText="Ejemplo: 42"
                />
            </Grid>
        </Grid>
    );
}
