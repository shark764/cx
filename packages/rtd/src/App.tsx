import { inIframe } from '@cx/utilities';
import {
  CssBaseline,
  Paper,
  Toolbar,
  Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { standardDashboardLinks } from 'utils/consts';
import { PageSideBar } from '@cx/components/PageSideBar';
import { PageHeader } from '@cx/components/PageHeader';
import { DashboardCustomize } from '@cx/components/Icons/DashboardCustomize';
import { LinkGroup } from '@cx/types';
import { Dashboard } from '@material-ui/icons';
import { Header } from 'components/Header';
import { Navigation } from 'navigation/Navigation';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing(12),
    padding: theme.spacing(2, 4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'inherit',
  },
  divider: { margin: theme.spacing(4, 0) },
}));

const navLinks = [
  { label: 'Realtime', to: '/standard' },
  { label: 'Custom', to: '/custom' },
];

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
const menuBarLinks: LinkGroup[] = [
  {
    key: 'standard',
    title: 'Standard Dashboards',
    GroupIcon: Dashboard,
    links: Object.values(standardDashboardLinks),
    open: false,
  },
  {
    key: 'custom',
    title: 'Custom Dashboards',
    GroupIcon: DashboardCustomize,
    links: mockCustomLinks,
    open: false,
  },
];

export function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />

      {/* Not in iframe */}
      {!inIframe() && (
        <PageHeader links={navLinks} header="Realtime Dashboards" />
      )}

      <PageSideBar groups={menuBarLinks} subheader="Realtime Dashboards" />

      <Paper elevation={0} className={classes.content + ' main'} style={{background: 'none'}}>
        {/* Needed to adjust when app has a PageHeader */}
        {!inIframe() && <Toolbar />}

        <Header />


        <Navigation />
      </Paper>
    </>
  );
}
