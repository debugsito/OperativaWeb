import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core'

const COLOR_TEXT = {
    primary: "var(--primaryButtonColor)",
    secondary: "var(--secondaryButtonColor)",
}

const useStyles = makeStyles(theme => ({
    root: props => ({
        color: COLOR_TEXT[props.color],
        fontWeight: props.weight ? props.weight : 500
    })
}))
export default function TextCustom(props) {
    const classes = useStyles(props)

    return (
        <span className={classes.root}>
            {props.children}
        </span>
    )
}

TextCustom.propTypes = {
    /**
     * The value of the weight 
     * @default 500
     */
    color: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    weight: PropTypes.number
};
