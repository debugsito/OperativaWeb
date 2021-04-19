import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ProcessCorousel, TitleWithLine } from "../";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundColor: '#EF1C40'
    },
    corousel: {
        height: '80%',
        margin: '4rem 1rem'
    }
}))

export default function SectionOurProcess(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TitleWithLine colorLine="#00F0CA" colorText="#fff">Nuestro Proceso</TitleWithLine>
            <div className={classes.corousel}>
                <ProcessCorousel />
            </div>
        </div>
    )
}
