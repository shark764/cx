import * as React from 'react';
import { Props } from '@cx/types';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { useBrandingTheme } from 'queries/generalQueries';

export interface ThemeStyle {
  styles: {
    navbar: string;
    navbarText: string;
    primaryColor: string;
    accentColor: string;
    accentHoverColor: string;
  };
}

const defaultTheme = {
  navbar: '#07487a',
  navbarText: '#ffffff',
  primaryColor: '#07487a',
  accentColor: '#3498db',
  accentHoverColor: '#e6f5ff',
};

// https://staging-api.cxengagelabs.net/v1/tenants/d676b68b-2f1c-498c-b6b3-db7e3a3e5708/branding

export function AppThemeProvider({ children }: Props) {
  const { data } = useBrandingTheme();
  const theme = data?.styles || defaultTheme;

  const muiTheme = React.useMemo(
    () => createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: theme.primaryColor,
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          main: '#a3acbd',
        },
      },
    }),
    [theme],
  );

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
