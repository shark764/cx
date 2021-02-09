import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { loadTheme } from '../redux/thunks';
import { Props } from '../index.types';

interface RootState {
  main: any;
}

export function AppThemeProvider( { children }: Props ) {
  const theme = useSelector( ( state: RootState ) => state.main.theme );
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( loadTheme() );
  }, [ dispatch ] );

  if ( !theme ) {
    return null;
  }

  return <ThemeProvider theme={ theme }>{ children }</ThemeProvider>;
}

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
