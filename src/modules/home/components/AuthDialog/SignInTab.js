import React from 'react'
import { useSelector } from "react-redux";
import { Grid, makeStyles } from '@material-ui/core';
import SignInForm from './SignInForm';
import { facebookSVG, googleSVG, linkedingSVG } from '../../images2';
import { getFacebookLoginUrl, getGoogleLoginUrl } from "../../../shared/config";


const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('sm')]: {
        root: {
            width: "100px",

        },
    }
}));

export default function SignInTab({ setValue }) {
    const classes = useStyles()
    const { isPostulant } = useSelector(state => state?.home)

    const handleClickFacebook = () => {
        window.location.href = getFacebookLoginUrl()
    }

    const handleClickGoogle = () => {
        window.location.href = getGoogleLoginUrl()
    }

    return (
        <Grid container spacing={1} justify="center">
            { isPostulant && <Grid item xs={12}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={6} className="text-center">
                        <img src={facebookSVG} onClick={handleClickFacebook} className={classes.root} />
                    </Grid>
                    <Grid item xs={6} className="text-center">
                        <img src={googleSVG} onClick={handleClickGoogle} className={classes.root} />
                    </Grid>
                    {/* <Grid item xs={4}>
                        <img src={linkedingSVG} className={classes.root} />
                    </Grid> */}
                </Grid>
            </Grid>}
            <Grid item xs={12}>
                <SignInForm setValue={setValue} />
            </Grid>
        </Grid>
    )
}
