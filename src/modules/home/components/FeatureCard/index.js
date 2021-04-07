import React from 'react'
import { makeStyles } from '@material-ui/core'
import { featureOne } from "../../images2";

const useStyles = makeStyles(theme => ({
    box: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #2958a329',
        borderRadius: '11px',
        padding: '0.5rem',
        margin: '0 1.5rem',
        width: '260px',
        display: 'flex',
    },
    boxImg: {
        marginRight: '0.5rem'
    },
    boxText: {
        fontSize: '1.1rem'
    }

}))

export default function FeatureCard({ text, img }) {
    const classes = useStyles()

    return (
        <div className={classes.box}>
            <div className={classes.boxImg}>
                <img src={img} />
            </div>
            <div className={classes.boxText}>
                <small>{text}</small>
            </div>
        </div>
    )
}
