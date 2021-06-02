import { Paper, Theme, useTheme } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = (theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.secondary,
    border: 'solid 1px rgba(128, 128, 128, 0.59)',
    boxShadow: 'none',
  },
});

export function ReportingDashboards() {
  const theme = useTheme();
  const classes = useStyles(theme);

  // const filters = useSelector(
  //   (state: { main: MainState }) => state.main.filters,
  // );

  const { pathname } = useLocation();
  const [, , dashboardId] = pathname.split('/');

  return (
    <Paper style={classes.paper}>
      Here is your dashboard:
      {dashboardId}
    </Paper>
  );
}
