import * as React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  location: {
    fontSize: 'inherit',
    fontWeight: 'bold',
  },
}));

export function NoMatch() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="auto"
      p={1}
      width="50%"
    >
      <Typography variant="h2">
        No match for
        {' '}
        <Typography
          component="span"
          color="secondary"
          className={classes.location}
        >
          {location.pathname}
        </Typography>
      </Typography>
    </Box>
  );
}
