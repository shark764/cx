import { inIframe } from '@cx/utilities';
import {
  Divider, makeStyles, Paper, Toolbar,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MainState } from 'redux/reducers/main';
import { drawerWidth } from 'utils/consts';
import { Navigation } from './navigation/Navigation';
import { Header } from './components/Header';
import { PageHeader } from './components/PageHeader';
import { PageSideMenu } from './components/PageSideMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#fafafa',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export function App() {
  const classes = useStyles();
  const isLeftPanelOpen = useSelector(
    (state: { main: MainState }) => state.main.leftPanelOpen,
  );

  return (
    <div className={classes.root}>
      {/* Not in iframe */}
      {!inIframe() && <PageHeader />}

      <PageSideMenu />

      <Paper
        elevation={0}
        className={`${classes.content} ${
          isLeftPanelOpen ? classes.contentShift : ''
        }`}
      >
        {/* Needed to adjust when app has a PageHeader */}
        {!inIframe() && <Toolbar />}

        <Header />

        <Divider className={classes.divider} />

        <Navigation />
      </Paper>
    </div>
  );
}
