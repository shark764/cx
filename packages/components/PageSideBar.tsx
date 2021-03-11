import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  createStyles, makeStyles, useTheme, Theme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SettingsIcon from '@material-ui/icons/Settings';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PublicIcon from '@material-ui/icons/Public';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';
import PeopleIcon from '@material-ui/icons/People';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 11,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    minWidth: '240px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    top: window.parent === window ? '50px' : '0px',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    top: window.parent === window ? '50px' : '0px',
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
    padding: theme.spacing(3),
  },
}));

export function PageSideBar() {
  const linkMap: { [key: string]: any[] } = {
    planning: [
      { label: 'Schedule', to: '/planning/schedule', icon: <CalendarTodayIcon /> },
      { label: 'Employees', to: '/planning/employees', icon: <PeopleIcon /> },
      { label: 'Settings', to: '/planning/settings', icon: <SettingsIcon /> },
    ],
    forecasting: [
      { label: 'Forecast', to: '/forecasting', icon: <TimelineIcon /> },
      { label: 'Settings', to: '/forecasting/settings', icon: <SettingsIcon /> },
    ],
    agent: [
      { label: 'Schedule', to: '/agent/schedule', icon: <CalendarTodayIcon /> },
      { label: 'Availability', to: '/agent/availability', icon: <AssignmentLateIcon /> },
      /**
       * NOT REQUIRED FOR MVP
       */
      // { label: 'Request', to: '/agent/request', icon: <Icon /> },
      // { label: 'Trade', to: '/agent/trade', icon: <Icon /> },
      // { label: 'Messages', to: '/agent/messages', icon: <Icon /> },
    ],
    admin: [
      { label: 'Organization', to: '/admin/organization', icon: <AllInboxIcon /> },
      { label: 'Activity Management', to: '/admin/activity-management', icon: <AssignmentLateIcon /> },
      { label: 'Competence Management', to: '/admin/competence-management', icon: <AssignmentIndIcon /> },
      { label: 'Day Types', to: '/admin/day-types', icon: <PublicIcon /> },
      { label: 'Default Restriction', to: '/admin/default-restriction', icon: <DesktopAccessDisabledIcon /> },
    ],
  };
  const route: string = useLocation().pathname.split('/')?.[1];
  const links = route && linkMap[route] ? linkMap[route] : [];

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {links.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              style={{
                textDecoration: 'none',
                color: 'grey',
                fontWeight: 'bold',
              }}
              title={link.label}
            >
              <ListItem button key={link.to}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
