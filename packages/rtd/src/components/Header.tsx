import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { MainState } from 'redux/reducers/main';
import { setIsLeftPanelOpen } from 'redux/thunks/main';
import { standardDashboardLinks } from 'utils/consts';
import { GlobalFilters } from './Filters/GlobalFilters';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  menuButton: {},
}));

export function Header() {
  const classes = useStyles();
  const isLeftPanelOpen = useSelector(
    (state: { main: MainState }) => state.main.leftPanelOpen,
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const splitLocation = pathname.split('/');

  const isStandard = splitLocation[1] === 'standard' || splitLocation[1] === '';

  const dashboardTitle: string = isStandard
    ? standardDashboardLinks[pathname]?.label
    : 'Some custom dashboad';

  const handleDrawerOpen = () => {
    dispatch(setIsLeftPanelOpen(true));
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={4} lg={4} xl={4} alignItems="center">
          {!isLeftPanelOpen && (
            <Grid item xs={2} sm={2}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={classes.menuButton}
              >
                <Menu />
              </IconButton>
            </Grid>
          )}

          <Grid item xs={10} sm={10}>
            <Typography variant="h6" color="textPrimary">
              {dashboardTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={8}
          lg={8}
          xl={8}
          justify="flex-end"
          alignItems="center"
          spacing={4}
        >
          <GlobalFilters />
        </Grid>
      </Grid>
    </Paper>
  );
}
