import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Props } from '@cx/types';
import { loadTheme } from '../redux/thunks';

interface RootState {
  main: any;
}

export function AppThemeProvider({ children }: Props) {
  const theme = useSelector((state: RootState) => state.main.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  if (!theme) {
    return null;
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
