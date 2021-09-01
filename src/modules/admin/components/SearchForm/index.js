import React from 'react'
import { Grid } from "@material-ui/core";
import ButtonGroup from "./ButtonGroup";
import { TextInput } from "../../../shared/components";

export default function SearchForm(props) {


    return (
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <ButtonGroup />
            </Grid>
            <Grid item xs={3}>
                <TextInput fullWidth size="small" label="Buscar" name="search" type="search" />
            </Grid>
        </Grid>
    )
}
