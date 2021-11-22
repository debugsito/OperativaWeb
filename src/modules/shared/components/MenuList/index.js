import React from 'react'
import Menu from "@material-ui/core/Menu"

export default function Index({ children, anchorEl, handleClose }) {


    return (
        <Menu
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
