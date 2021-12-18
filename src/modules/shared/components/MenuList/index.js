import React from 'react'
import Menu from "@material-ui/core/Menu"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    paper:{

    }
}))

export default function Index({ children, anchorEl, handleClose }) {
    const classes = useStyles

    return (
        <Menu
            elevation={1}
            classes={classes}
            getContentAnchorEl={null}
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
        >
            {children}
        </Menu>
    )
}
