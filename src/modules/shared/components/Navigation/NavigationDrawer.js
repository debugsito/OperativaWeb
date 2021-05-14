import React from 'react'
import clsx from 'clsx';
import { Link as LinkRouter } from "react-router-dom";
import { MenuRoutes } from "../../libs/menuRoutes";
import { Collapse, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import WidgetsIcon from '@material-ui/icons/Widgets';

const drawerWidth = 230;

const getAvatarIcon = (name) => {
  switch (name) {
    case 'Inicio':
      return (<HomeIcon />);
    case 'Mi perfil':
      return (<AccountCircleIcon />);
    case 'Usuarios':
      return (<GroupIcon />);
    case 'Solicitudes':
      return <AssignmentIcon />
    case 'Configuración':
      return <SettingsIcon />
    case 'Cambiar password':
      return <LockIcon />
    case 'Facturación':
      return <WidgetsIcon />
    default:
      return (<InboxIcon />);
  }
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#373737",
    overflowX: 'hidden',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#373737",
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NavigationDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const menuList = MenuRoutes().list;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openNestedList, setOpenNestedList] = React.useState(false);

  const handleListItemClick = (item, index) => {
    if (item.nestedList) {
      setOpenNestedList(!openNestedList)
    }
    if (openNestedList) setOpenNestedList(false)
    setSelectedIndex(index);
    setSelectedSubMenuIndex(null)
  };
  const handleClickSubItem = (index) => {
    setSelectedSubMenuIndex(index);
    setSelectedIndex(null)
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const navigation = menuList?.map((item, index) => {
    return (
      <>
        <LinkRouter key={item.name} to={item.nestedList ? "#" : item.to} style={{ textDecoration: 'none' }}>
          <ListItem button key={item.name} selected={!item.nestedList && selectedIndex === index} onClick={() => handleListItemClick(item, index)}>
            <ListItemIcon>{getAvatarIcon(item.name)}</ListItemIcon>
            <ListItemText primary={item.name} />
            {item.nestedList && (openNestedList ? <ExpandLess /> : <ExpandMore />)}
            {selectedIndex === index && <ArrowLeftIcon style={{ position: "relative", top: "0%" }} />}
          </ListItem>
        </LinkRouter>
        {
          item.nestedList && item.nestedList.map((element, index2) => (
            <Collapse in={openNestedList} timeout="auto" unmountOnExit key={element.name}>
              <LinkRouter key={element.name} to={element.to} style={{ textDecoration: 'none' }}>
                <List component="div" disablePadding>
                  <ListItem button selected={selectedSubMenuIndex === index2} className={classes.nested} onClick={() => handleClickSubItem(index2)}>
                    <ListItemIcon>
                      {getAvatarIcon(element.name)}
                    </ListItemIcon>
                    <ListItemText primary={element.name} />
                  </ListItem>
                </List>
              </LinkRouter>
            </Collapse>
          ))

        }

      </>
    )
  })

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openDrawer,
        [classes.drawerClose]: !openDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <div class="side-bar">
        <List
          onMouseMove={() => setOpenDrawer(true)}
          onMouseLeave={() => setOpenDrawer(false)}
        >
          {
            navigation
          }
        </List>
      </div>
    </Drawer>
  )
}
