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
    alignItems: "center",
    borderRadius: "0 10px 0 0"
  },
  containerLogoPostulante: {
    height: "64px",
    background: "var(--principalColor)",
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0 0 20px 0"
  },
  rootToolbar: {
    padding: "0 1rem 0 0",
    color: "var(--paragraphColor)"
  },
  rootToolbarApplicant: {
    color: "var(--paragraphColor)",
    paddingLeft: '0',
    paddingRight: '0',
    backgroundColor: 'var(--smokeWhiteColor)'
  },
  containerInfo:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  },
  info:{
    fontWeight:500,
    lineHeight:1.5
  }
}));

const NoHeaderRoutes = [
  "/registro",
  "/registro/postulante",
  "/registro/empresa",
  "/registro/municipalidad",
  "/terminos-y-condiciones",
  "/publication-multiposting/:title",
  '/registro/postulante/datos-personales',
  '/registro/postulante/finish-cv',
  '/registro/postulante/finish-cv-status',
  '/registro/postulante/educacion',
  '/registro/postulante/experiencia-laboral',
  '/registro/postulante/cuestionario',
]

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

  const condition = (location.pathname !== "/")
  const noHeader =  NoHeaderRoutes.includes(location.pathname);

  return (
    <div className={classes.root}>
      { condition && !noHeader &&
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classes.appBar}
          >
            {user.account.rol_usuario === 'postulante' ?
                <Toolbar classes={{ root: classes.rootToolbarApplicant }}>
                        <div className={classes.containerLogoPostulante}>
                          <a href={session ? '/' : process.env.REACT_APP_PATH_LANDING} ><img src={logoSVG} alt="Operativa" /></a>
                        </div>
                </Toolbar>
            :
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
                            <Grid item className={classes.containerInfo}>
                              <Typography variant='body2' className={classes.info}>{user.account.razon_social}</Typography>
                              <Typography variant='body2' className={classes.info}>RUC: {user?.account?.user?.document_number}</Typography>
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
                
                }
          </AppBar>
        </>
      }
      {
        hasDashboard && !noHeader &&
        <Hidden smDown>
          <NavigationDrawer />
        </Hidden>
      }
      <main className={classes.content}>
        <div className={`${condition && !noHeader ? classes.toolbar : ''}`} />
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
