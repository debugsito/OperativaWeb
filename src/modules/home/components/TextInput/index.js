import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {

    },
    input: {
        width: '100%',
        background: '#F5F7F9 0% 0% no-repeat padding-box',
        borderRadius: '25px',
        color: '#373737',
        fontFamily: "Roboto-light",
        border: 0,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        padding: '.375rem .75rem',
        '&:focus': {
            color: '#495057',
            backgroundColor: '#fff',
            borderColor: '#80bdff',
            outline: 0,
            boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
        }
    }
}))


export default function ButtonContact({ ...props }) {
    const classes = useStyles(props)

    return (
        <input className={classes.input} {...props} />
    )
}
