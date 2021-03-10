import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',//'#E20613',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
}));

export default function SimpleBackdrop({ ...props }) {
    const classes = useStyles();
    return (
        <div>

            <Backdrop
                className={classes.backdrop}
                {...props}
            >
                <CircularProgress color="inherit" size="5rem" thickness={4} />
            </Backdrop>
        </div>
    );
}
