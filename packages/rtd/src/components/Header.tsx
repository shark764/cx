import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import { standardDashboardLinks } from 'utils/consts';
import { GlobalFilters } from './Filters/GlobalFilters';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.secondary,
    border: 'solid 1px rgba(128, 128, 128, 0.59)',
    boxShadow: 'none',
  },
  title: {
    color: 'gray',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 'inherit',
    marginBottom: theme.spacing(1),
  },
}));

export function Header() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const splitLocation = pathname.split('/');

  const isStandard = splitLocation[1] === 'standard' || splitLocation[1] === '';

  const dashboardTitle: string = isStandard
    ? standardDashboardLinks[pathname]?.label
    : 'Some custom dashboad';

  return (
    <>
      <Typography variant="h6" color="textSecondary">
        {dashboardTitle}
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          Global Filters
        </Typography>

        <GlobalFilters />
      </Paper>
    </>
  );
}
