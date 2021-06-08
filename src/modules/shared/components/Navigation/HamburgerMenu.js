import React from 'react'
import { Link as LinkRouter } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
import { Divider, Hidden, Grid, IconButton, Menu, MenuItem, Typography, makeStyles } from '@material-ui/core';

import { Link } from '..';
import { MenuRoutes } from "../../libs/menuRoutes";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
        maxWidth: "100% !important",
        top: "60px !important",
        left: "0px !important",
        borderRadius: "0 0 8px 8px"
    }
}))

export default function Buttonlogout({ email, handleSignOut }) {
    const classes = useStyles()
    const menuList = MenuRoutes().list
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* Vista para Laptops */}
            <Hidden smDown>
                <Grid item>
                    <Grid container justify="flex-end" alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography paragraph className="color-white navigation-text">
                                {email}
                            </Typography>
                            <Link className="color-white navigation-text" onClick={handleSignOut}>Cerrar sesión</Link>
                        </Grid>
                        <Grid item>
                            <AccountCircle fontSize="large" />
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            {/* Vista para Movil */}
            <Hidden mdUp>
                <IconButton
                    // ref={anchorRef}
                    aria-controls={'menu-list-grow'}
                    aria-haspopup="true"
                    color="inherit"
                    aria-label="menu"
                    edge="end"
                    onClick={handleClick}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <Menu
                    id="hamburger-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PopoverClasses={{
                        paper: classes.paper
                    }}
                >
                    {
                        menuList.map((item) => (
                            <div key={item.name}>
                                <LinkRouter to={item.to} style={{ textDecoration: 'none', color: "#000000DE" }}>
                                    <MenuItem onClick={handleClose}>{item.name}</MenuItem>
                                </LinkRouter>
                                <Divider variant="middle" />
                            </div>
                        ))
                    }
                    <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
                </Menu>
            </Hidden>

        </>
    )
}
