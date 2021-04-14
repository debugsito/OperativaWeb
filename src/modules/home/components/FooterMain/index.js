import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { logoPng, fbLogo, linkedingLogo } from "../../images2";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EF1C40',
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoFooter: {
        marginLeft: '2rem',
        display: 'flex',
        flexDirection: 'columm',
        alignItems: 'center'
    },
    redesFooter: {
        marginRight: '2rem',
        display: 'flex',
        flexDirection: 'columm',
        alignItems: 'center'
    }

}))

export default function Footer(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.logoFooter}>
                <img src={logoPng} />
            </div>
            <div className={classes.redesFooter}>
                <img src={fbLogo} />
                <img src={linkedingLogo} />
            </div>

        </div>
    )
}
