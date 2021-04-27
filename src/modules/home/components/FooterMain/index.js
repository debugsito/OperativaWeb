import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { logoPng, fbLogo, linkedingLogo } from "../../images2";

const useStyles = makeStyles(theme => ({
    root: {
        // width: '100%',
        height: '100%',
        backgroundColor: '#EF1C40',
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoFooter: {
        marginLeft: '2rem',
        display: 'flex',
        flexDirection: 'columm',
        alignItems: 'center',

    },
    operativaLogo: {
        [theme.breakpoints.down('sm')]: {
            width: '140px'
        },
    },
    redesFooter: {
        marginRight: '2rem',
        display: 'flex',
        flexDirection: 'columm',
        alignItems: 'center'
    },
    fbLogo: {
        margin: '0 1rem',
        [theme.breakpoints.down('sm')]: {
            width: '40px'
        },
    },
    LinkedingLogo: {
        [theme.breakpoints.down('sm')]: {
            width: '45px'
        },
    }

}))

export default function Footer(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.logoFooter}>
                <img className={classes.operativaLogo} src={logoPng} />
            </div>
            <div className={classes.redesFooter}>
                <img className={classes.fbLogo} src={fbLogo} />
                <img className={classes.LinkedingLogo} src={linkedingLogo} />
            </div>

        </div>
    )
}
