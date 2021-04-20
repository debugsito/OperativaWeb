import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {

    },
    button: (props) => ({
        border: props.active ? '2px solid #F11C40' : '2px solid #DBDBDB',
        color: props.active ? '#F11C40' : '#DBDBDB',
        borderRadius: '25px',
        backgroundColor: '#FFFFFF',
        // fontFamily: 'Roboto, sans-serif',
        fontWeight: 450,
        padding: '.25rem 1.5rem',
        fontSize: '1.1rem',
        outline: 0,
    })
}))


export default function ButtonContact({ children, handleClick, ...props }) {
    const classes = useStyles(props)

    return (
        <button className={classes.button} onClick={handleClick}>
            {children}
        </button>
    )
}
