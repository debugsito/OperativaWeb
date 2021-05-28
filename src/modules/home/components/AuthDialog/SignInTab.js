import React from 'react'
import { useSelector } from "react-redux";
import { Grid } from '@material-ui/core';
import SignInForm from './SignInForm';
import { facebookSVG, googleSVG, linkedingSVG } from '../../images2';
// import { parametersFB } from "../../../shared/config";

export default function SignInTab({ setValue }) {
    const { isPostulant } = useSelector(state => state?.home)
    // console.log("parametersFB", parametersFB)

    const handleClickFacebook = () => {

    }

    return (
        <Grid container spacing={1} justify="center">
            { isPostulant && <Grid item xs={12}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={4}>
                        <img src={facebookSVG} onClick={handleClickFacebook} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={googleSVG} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={linkedingSVG} />
                    </Grid>
                </Grid>
            </Grid>}
            <Grid item xs={12}>
                <SignInForm setValue={setValue} />
            </Grid>
        </Grid>
    )
}
