import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from "react-router-dom";
import { AppBar, CssBaseline, Grid, Hidden, Toolbar, Typography, makeStyles } from '@material-ui/core';

import HamburgerMenu from "./HamburgerMenu";
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
    height: '100vh',
  },
}));

export default function Navigation({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation()
  const session = AppSession.get();
  const hasDashboard = MenuRoutes().hasDashboard;
  const { user } = useSelector(state => state?.auth);

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleSignOut = (event) => {
    event.preventDefault();
    dispatch(signOut());
    return <Redirect to="/" />
  }

  return (
    <div className={classes.root}>
      {location.pathname !== "/" &&
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h6" noWrap>
                    <a href={session ? '/' : process.env.REACT_APP_PATH_LANDING} ><img src={logoSVG} alt="Operativa" /></a>
                  </Typography>
                </Grid>
                {
                  session &&
                  <Grid item>
                    <HamburgerMenu email={user.account.email} handleSignOut={handleSignOut} />
                  </Grid>
                }
              </Grid>
            </Toolbar>
          </AppBar>
        </>
      }
      {
        hasDashboard &&
        <Hidden smDown>
          <NavigationDrawer />
        </Hidden>
      }
      <main className={classes.content}>
        <div className={`${location.pathname !== "/" ? classes.toolbar : ''}`} />
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