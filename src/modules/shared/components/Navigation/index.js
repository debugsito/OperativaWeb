import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, ClickAwayListener, Grid, Grow, IconButton, MenuList, MenuItem, Paper, Popper, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from '..';
import { logoSVG } from '../../images';
import AppSession from '../../libs/session/AppSession';
import { MenuRoutes } from "../../libs/menuRoutes";
import { signOut } from '../../../../store/actions/auth/auth.action';
import './index.css';



import { Backdrop } from "../../components";

import NavigationDrawer from "./NavigationDrawer";

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

  useEffect(() => {
    if (showLoading) {
      console.log("logout...")
      setIsLoading(true)
      dispatch(signOut());
    }
  }, [showLoading])

  const handleSignOut = () => {
    setIsLoading(true)
    dispatch(signOut());
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
        // <Drawer

        //   variant="permanent"
        //   className={clsx(classes.drawer, {
        //     [classes.drawerOpen]: open,
        //     [classes.drawerClose]: !open,
        //   })}
        //   classes={{
        //     paper: clsx({
        //       [classes.drawerOpen]: open,
        //       [classes.drawerClose]: !open,
        //     }),
        //   }}
        // >
        //   <div className={classes.toolbar}>
        //     <IconButton onClick={handleDrawerClose}>
        //       {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        //     </IconButton>
        //   </div>
        //   <Divider />
        //   <div class="side-bar">
        //     <List
        //       onMouseMove={() => setOpen(true)}
        //       onMouseLeave={() => setOpen(false)}
        //     >
        //       {menuList?.map((item, index) => (
        //         <LinkRouter to={item.to} style={{ textDecoration: 'none' }}>
        //           <ListItem button key={item.name} selected={selectedIndex === index} onClick={event => handleListItemClick(event, index)}>
        //             <ListItemIcon>{getAvatarIcon(item.name)}</ListItemIcon>
        //             <ListItemText primary={item.name} />
        //             {selectedIndex === index && <ArrowLeftIcon style={{ position: "relative", top: "0%" }} />}
        //           </ListItem>
        //         </LinkRouter>
        //       ))}
        //     </List>

        //   </div>

        // </Drawer>
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