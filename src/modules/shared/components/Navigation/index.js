import React, { useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { AppBar, CssBaseline, ClickAwayListener, Grid, Grow, IconButton, MenuList, MenuItem, Paper, Popper, Toolbar, Typography } from '@material-ui/core';


import { Link } from '..';
import { logoSVG } from '../../images';
import AppSession from '../../libs/session/AppSession';
import { MenuRoutes } from "../../libs/menuRoutes";
import { signOut } from '../../../../store/actions/auth/auth.action';

import { Backdrop } from "../../components";
import NavigationDrawer from "./NavigationDrawer";
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "var(--principalColor)"
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
}));

export default function Navigation({ children }) {
  const history = useHistory();
  const session = AppSession.get();
  const hasDashboard = MenuRoutes().hasDashboard;
  const dispatch = useDispatch();
  const { user, showLoading } = useSelector(state => state?.auth);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  // useEffect(() => {
  //   if (showLoading) {
  //     console.log("logout...")
  //     setIsLoading(true)
  //     dispatch(signOut());
  //   }
  // }, [showLoading])

  const handleSignOut = () => {
    // setIsLoading(true)
    dispatch(signOut());
    // history.push("/")
    return <Redirect to="/" />
  }

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="h6" noWrap>
                <a href={session ? '/' : process.env.REACT_APP_PATH_LANDING} ><img src={logoSVG} alt="Operativa" /></a>
              </Typography>
            </Grid>
            {session && !hasDashboard && (
              <Grid item>
                <IconButton
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
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
              </Grid>
            )
            }
            {
              hasDashboard &&
              (
                <Grid item>
                  <Grid container justify="flex-end" alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography paragraph className="color-white navigation-text">
                        {user.account.email}
                      </Typography>
                      <Link className="color-white navigation-text" onClick={handleSignOut}>Cerrar sesión</Link>
                    </Grid>
                    <Grid item>
                      <AccountCircle fontSize="large" />
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
        </Toolbar>
      </AppBar>
      {
        hasDashboard &&
        <NavigationDrawer />

      }
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <Backdrop
          open={isLoading}
          onClick={() => setIsLoading(false)}
          transitionDuration={1000}
        />
      </main>
    </div >
  );
}