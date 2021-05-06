import * as React from 'react';
import { inIframe } from '@cx/utilities';
import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import {
  ChevronLeft,
  Dashboard,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { drawerWidth, standardDashboardLinks } from 'utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { MainState } from 'redux/reducers/main';
import { setIsLeftPanelOpen } from 'redux/thunks/main';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  submenu: { color: '#2a3439' },
  nested: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: theme.spacing(4),
    color: '#3b444b',
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
}));

const mockCustomLinks = [
  {
    label: 'My Awesome Dashboard',
    to: '/custom/4e1d31e0-b071-11eb-8529-0242ac130003',
    LinkIcon: Dashboard,
  },
  {
    label: 'More Awesome than the last one',
    to: '/custom/6f96eb72-b071-11eb-8529-0242ac130003',
    LinkIcon: Dashboard,
  },
];

function MenuListItem({
  title,
  links,
  open,
}: {
  title: string;
  links: any[];
  open: boolean;
}) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = React.useState(!!open);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary={title} className={classes.submenu} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout={100} unmountOnExit>
        <List component="div" disablePadding>
          {links.map(({ LinkIcon, ...link }: any) => (
            <ListItem
              button
              color="inherit"
              component={RouterLink}
              to={link.to}
              key={link.to}
              className={`${classes.nested} ${
                link.to === pathname ? classes.activeLink : ''
              }`}
              selected={link.to === pathname}
            >
              <ListItemIcon>
                <LinkIcon
                  color={link.to === pathname ? 'primary' : 'inherit'}
                />
              </ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export function PageSideMenu() {
  const classes = useStyles();
  const isLeftPanelOpen = useSelector(
    (state: { main: MainState }) => state.main.leftPanelOpen,
  );
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(setIsLeftPanelOpen(false));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={isLeftPanelOpen}
    >
      {/* Needed to adjust when app has a PageHeader */}
      {!inIframe() && <Toolbar />}

      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>

      <Divider />

      <div className={classes.drawerContainer}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              Realtime Dashboards
            </ListSubheader>
          )}
          className={classes.root}
        >
          <MenuListItem
            title="Standard Dashboards"
            links={Object.values(standardDashboardLinks)}
            open
          />
          <Divider />
          <MenuListItem
            title="Custom Dashboards"
            links={mockCustomLinks}
            open={false}
          />
        </List>
      </div>
    </Drawer>
  );
}
