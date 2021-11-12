import React from 'react'
import PropTypes from 'prop-types';
import { Tab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    rootTab: {
        background: "#ebebeb",
        '&$selected': {
            color: "var(--paragraphColor)",
            background: "#fff",
        }
    },
    selected: {},
}))

export default function TabCustom({ label, index }) {
    const classes = useStyles()

    return (
        <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label={label} {...a11yProps(index)} />
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabCustom.propTypes = {
    index: PropTypes.any.isRequired,
    label: PropTypes.any.isRequired,
};
