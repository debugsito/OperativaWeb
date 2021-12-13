import React, { useState } from 'react'
import { Link as LinkRouter } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
import { Divider, Hidden, Grid, IconButton, Menu, MenuItem, Typography, makeStyles } from '@material-ui/core';

import { Link, AccountType, Button, MenuList } from '../';
import { MenuRoutes } from "../../libs/menuRoutes";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
        maxWidth: "100% !important",
        top: "60px !important",
        left: "0px !important",
        borderRadius: "0 0 8px 8px"
    },
    color:{
        color:"#757575"
    }
}))

export default function Buttonlogout({ account, handleSignOut }) {
    const classes = useStyles()
    const menuList = MenuRoutes().list
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menu, setMenu] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenu = () => {

    }

    return (
        <>
            {/* Vista para Laptops */}
            <Hidden smDown>
                <Grid item>
                    <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
                        <Grid item>
                            <AccountType text="Cuenta" account="Básica" />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined">CAMBIAR DE PLAN</Button>
                        </Grid>
                        <Grid item>
                            <AccountCircle fontSize="large" />
                        </Grid>
                        <Grid item>
                            <Typography variant='body1' className={classes.color}>
                                Bienvenido
                            </Typography>
                            <Typography variant='body1'>
                                <b>{account?.user?.first_name}</b>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="abrir menu" onClick={(event) => setMenu(event.currentTarget)}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                            <MenuList anchorEl={menu} handleClose={() => setMenu(null)}>
                                <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
                            </MenuList>
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
