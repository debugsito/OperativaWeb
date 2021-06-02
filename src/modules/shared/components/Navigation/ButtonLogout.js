import React from 'react'
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { ClickAwayListener, Hidden, Grid, Grow, IconButton, MenuList, MenuItem, Paper, Popper, Typography } from '@material-ui/core';

import { Link } from '..';

export default function Buttonlogout({ email, handleSignOut }) {
    const anchorRef = React.useRef(null);
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return
        setOpenMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }


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
                    ref={anchorRef}
                    aria-controls={'menu-list-grow'}
                    aria-haspopup="true"
                    color="inherit"
                    aria-label="cerrar sesión"
                    edge="end"
                    onClick={handleToggle}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Hidden>

        </>
    )
}
