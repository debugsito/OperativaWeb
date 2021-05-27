import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { logoMovil } from "../../images2";
import TabsDialog from "./TabsDialog";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    containerLogo: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem"
    }


}));

export default function SignInDialog({ isPostulant }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.containerLogo}>
                <img src={logoMovil} />
            </div>
            <TabsDialog isPostulant={isPostulant} />

        </div>
    );
}


SignInDialog.propTypes = {
    isPostulant: PropTypes.bool.isRequired,
};

