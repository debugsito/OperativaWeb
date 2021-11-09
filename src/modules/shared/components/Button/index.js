import React from 'react';
import { Button, makeStyles } from "@material-ui/core";

// import './index.css'
const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: "10px",
    },
    textPrimary: {
        color: "var(--primaryButtonColor)",
    },
    outlinedPrimary: {
        color: "var(--primaryButtonColor)",
        border: "1px solid var(--primaryButtonColor)",
        '&:hover': {
            border: "1px solid var(--primaryButtonColor)",
            background: "transparent",
        },
    },
    outlinedSecondary: {
        color: "#5D5FEF",
        border: "1px solid #5D5FEF",
        '&:hover': {
            border: "1px solid #5D5FEF",
            background: "transparent",
        },

    },
    containedPrimary: {
        background: "var(--primaryButtonColor)",
        '&:hover': {
            background: '#bb0511'
        },
    },
    containedSecondary: {
        background: "#5D5FEF",
        '&:hover': {
            background: '#3c3fe8'
        },
    }
}))

export default function CustomButton({ children, color = "primary", ...props }) {
    const classes = useStyles()
    return (
        <Button
            color={color} {...props}
            classes={{
                root: classes.root,
                textPrimary: classes.textPrimary,
                outlinedPrimary: classes.outlinedPrimary,
                outlinedSecondary: classes.outlinedSecondary,
                containedPrimary: classes.containedPrimary,
                containedSecondary: classes.containedSecondary
            }}
        >
            {children}
        </Button>
    );
};
