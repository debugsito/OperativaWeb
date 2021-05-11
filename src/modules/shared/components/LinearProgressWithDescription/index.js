import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 12,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: props => ({
        borderRadius: 5,
        backgroundColor: props.color ?
            (props.color === "celeste" ? "#46A9D4" :
                (props.color === "naranja" ? "#FBC547" :
                    (props.color === "verde" ? "#B8EA71" : props.color)
                )
            ) : "#111",
    })
    ,
})
)(LinearProgress);

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
        // width: "150px",
        '& h4': {
            marginTop: 0,
            marginBottom: 0
        },
        '& p': {
            marginTop: 0,
            marginBottom: 0,
            fontSize: "0.8rem"
        }
    },
});

function CustomLinearProgress(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <BorderLinearProgress variant="determinate" value={props.value} color={props.colorBar} />
        </div>
    )
}

export default CustomLinearProgress

CustomLinearProgress.propTypes = {
    title: PropTypes.any.isRequired,
    description: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    colorBar: PropTypes.PropTypes.oneOf(["celeste", "naranja", "verde"]).isRequired
};
