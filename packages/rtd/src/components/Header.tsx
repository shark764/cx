import { Paper, Typography, Theme } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router';
import { standardDashboardLinks } from 'utils/consts';
import { GlobalFilters } from './Filters/GlobalFilters';

const Title = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
  margin-bottom: 0px;
`;

const useStyles = makeStyles((theme: Theme) => ({
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
    <span style={{background: '#fff !important'}}>
      <Typography variant="h6" color="textSecondary">
        {dashboardTitle}
      </Typography>

      <Paper elevation={0} className={classes.paper}>
        <Title>
          Global Filters
        </Title>

        <GlobalFilters />
      </Paper>
    </span>
  );
}
