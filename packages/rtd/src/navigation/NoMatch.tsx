import {
  Box, Theme, Typography, useTheme,
} from '@material-ui/core';
import { CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';

const useStyles = (theme: Theme) => ({
  location: {
    fontSize: 'inherit',
    fontWeight: 'bold',
  } as CSSProperties,
});

export function NoMatch() {
  const theme = useTheme();
  const classes = useStyles(theme);
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
        <Typography component="span" color="secondary" style={classes.location}>
          {location.pathname}
        </Typography>
      </Typography>
    </Box>
  );
}
