import * as React from 'react';
import { inIframe } from '@cx/utilities';
import {
  ClickAwayListener,
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
  Theme,
  Toolbar,
} from '@material-ui/core';
import {
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
} from '@material-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { LinkGroup, LinkItem } from '@cx/types';

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
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
  rlink: {
    textDecoration: 'none',
    color: 'grey',
    fontWeight: 'bold',
  },
  submenu: {
    color: '#2a3439',
  },
  nested: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: theme.spacing(4),
    color: '#3b444b',
  },
  activeLink: {
    color: '#2a3439',
  },
}));

function MenuListItem({
  link,
  isNested = false,
  handleOnClick,
}: {
  link: LinkItem;
  isNested: boolean;
  handleOnClick(): void;
}) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { LinkIcon } = link;

  return (
    <ListItem
      button
      key={link.to}
      color="inherit"
      component={RouterLink}
      to={link.to}
      title={link.label}
      selected={link.to === pathname}
      className={`${link.label.split(' ').join('')}Link ${classes.rlink} ${
        isNested ? classes.nested : ''
      } ${link.to === pathname ? classes.activeLink : ''}`}
      onClick={handleOnClick}
    >
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary={link.label} />
    </ListItem>
  );
}

function GroupList({
  title,
  GroupIcon,
  links,
  open,
  drawerOpen,
  handleDrawerOpen,
  handleDrawerClose,
}: {
  title: string;
  GroupIcon: React.ComponentType;
  links: LinkItem[];
  open: boolean;
  drawerOpen: boolean;
  handleDrawerOpen(): void;
  handleDrawerClose(): void;
}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(!!open);

  /**
   * TODO:
   * Rewrite this without using hook useEffect
   */
  React.useEffect(() => {
    if (!drawerOpen) {
      setIsOpen(false);
    }
  }, [drawerOpen]);

  const handleClick = () => {
    if (!drawerOpen) {
      handleDrawerOpen();
    }
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    handleDrawerClose();
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary={title} className={classes.submenu} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout={100} unmountOnExit>
        <List component="div" disablePadding>
          {links.map((link: LinkItem) => (
            <MenuListItem
              key={link.to}
              link={link}
              isNested
              handleOnClick={handleItemClick}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export function PageSideBar({
  links,
  groups,
  subheader,
}: {
  links?: LinkItem[];
  groups?: LinkGroup[];
  subheader?: string;
}): React.ReactElement {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <Drawer
        variant="permanent"
        className={`${classes.drawer} ${
          open ? classes.drawerOpen : classes.drawerClose
        }`}
        classes={{
          paper: open ? classes.drawerOpen : classes.drawerClose,
        }}
      >
        {/* Needed to adjust when app has a PageHeader */}
        {!inIframe() && <Toolbar />}

        <div className={classes.toolbar}>
          {open && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          )}
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <Divider />
        <List
          aria-labelledby="list-menuitems"
          subheader={
            open && subheader ? (
              <ListSubheader component="div">{subheader}</ListSubheader>
            ) : (
              undefined
            )
          }
        >
          {links
            && links.map((link: LinkItem) => (
              <MenuListItem
                key={link.to}
                link={link}
                isNested={false}
                handleOnClick={handleDrawerClose}
              />
            ))}
          {groups
            && groups.map((group: LinkGroup, index) => (
              <GroupList
                {...group}
                key={group.key || index.toString()}
                drawerOpen={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            ))}
        </List>
      </Drawer>
    </ClickAwayListener>
  );
}
