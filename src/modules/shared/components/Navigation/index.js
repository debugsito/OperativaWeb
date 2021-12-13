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
    background: "#fff",
    boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1);",
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
  containerLogo: {
    height: "64px",
    background: "var(--principalColor)",
    width: 230,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

  },
  rootToolbar: {
    padding: "0 1rem 0 0",
    color: "var(--paragraphColor)"
  }
}));

export default function Navigation({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation()
  const session = AppSession.get();
  const hasDashboard = MenuRoutes().hasDashboard;
  const { user } = useSelector(state => state?.auth);
  const isSubjetBusiness = user.account.rol_usuario === "business" || user.account.rol_usuario === "muni"

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
            className={classes.appBar}
          >
            <Toolbar classes={{ root: classes.rootToolbar }}>
              <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <div className={classes.containerLogo}>
                        <a href={session ? '/' : process.env.REACT_APP_PATH_LANDING} ><img src={logoSVG} alt="Operativa" /></a>
                      </div>
                    </Grid>
                    {
                      (hasDashboard && isSubjetBusiness) &&
                      < Grid item>
                        <Typography variant='subtitle1'>{user.account.razon_social}</Typography>
                        <Typography variant='subtitle1'>RUC: {user?.account?.user?.document_number}</Typography>
                      </Grid>
                    }
                  </Grid>
                </Grid>
                {
                  session &&
                  <Grid item>
                    <HamburgerMenu account={user.account} handleSignOut={handleSignOut} />
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