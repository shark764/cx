import { inIframe } from '@cx/utilities';
import {
  Paper, Theme, Toolbar, useTheme,
} from '@material-ui/core';
import { standardDashboardLinks, tempTenantId } from 'utils/consts';
import { PageSideBar } from '@cx/components/PageSideBar';
import { PageHeader } from '@cx/components/PageHeader';
import { DashboardCustomize } from '@cx/components/Icons/DashboardCustomize';
import { LinkGroup, LinkItem } from '@cx/types';
import { Dashboard } from '@material-ui/icons';
import { Header } from 'components/Header';
import { Navigation } from 'navigation/Navigation';
import { useFetchEntity } from 'queries/generalQueries';

const useStyles = (theme: Theme) => ({
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
});

const navLinks = [
  { label: 'Realtime', to: '/standard' },
  { label: 'Custom', to: '/custom' },
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
    links: [],
    open: false,
  },
];

export function App() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { data: dashboards } = useFetchEntity(
    tempTenantId,
    'dashboards',
    'active=true&without-active-dashboard=true',
  );
  const customLinks: LinkItem[] = dashboards?.map((dashboard: any) => ({
    label: dashboard.name,
    to: `/custom/${dashboard.id}`,
    LinkIcon: Dashboard,
  })) || [];
  menuBarLinks[1].links = customLinks;

  return (
    <>
      {/* Not in iframe */}
      {!inIframe() && (
        <PageHeader links={navLinks} header="Realtime Dashboards" />
      )}

      <PageSideBar groups={menuBarLinks} subheader="Realtime Dashboards" />

      <Paper elevation={0} style={classes.content}>
        {/* Needed to adjust when app has a PageHeader */}
        {!inIframe() && <Toolbar />}

        <Header />

        <Navigation />
      </Paper>
    </>
  );
}
