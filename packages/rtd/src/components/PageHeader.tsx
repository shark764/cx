import {
  AppBar,
  Container,
  Link,
  List,
  ListItem,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activeLink: {
    color: theme.palette.secondary.light,
  },
}));

const links = [
  { label: 'Realtime Dashboards', to: '/standard' },
  { label: 'Custom Realtime Dashboards', to: '/custom' },
];

export function PageHeader() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const splitLocation = pathname.split('/');

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link color="inherit" component={RouterLink} to="/">
          <Typography variant="h6" noWrap>
            Realtime Dashboards
          </Typography>
        </Link>
        <Container maxWidth="md" className={classes.toolbar}>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.toolbar}
          >
            {links.map((link) => (
              <ListItem
                button
                color="inherit"
                component={RouterLink}
                to={link.to}
                key={link.to}
                className={
                  `/${splitLocation[1]}` === link.to ? classes.activeLink : ''
                }
              >
                {link.label}
              </ListItem>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
