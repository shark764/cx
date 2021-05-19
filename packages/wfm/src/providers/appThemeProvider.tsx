import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Props } from '@cx/types';
import { loadTheme } from '../redux/thunks';
import { RootState } from '../redux/store';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
// import { createMuiTheme } from '@material-ui/core/styles';

// https://staging-api.cxengagelabs.net/v1/tenants/d676b68b-2f1c-498c-b6b3-db7e3a3e5708/branding
const temp = {
  "result": {
    "logo": null,
    "updated": "2018-08-08T22:00:18Z",
    "favicon": null,
    "productName": "CxEngage",
    "updatedBy": "6fe5e430-9b56-11e8-9e38-9440dab83f25",
    "active": true,
    "styles": "{\"navbar\": \"#07487a\",\"navbarText\": \"#ffffff\",\"primaryColor\": \"#07487a\",\"accentColor\": \"#3498db\",\"accentHoverColor\": \"#e6f5ff\"}",
    "tenantId": "44720170-922b-11e6-8754-ca81484488df"
  }
};

const {
  // navBar,
  // navbarText,
  primaryColor,
  // accentColor,
  // accentHoverColor
} = JSON.parse(temp.result.styles);

export function AppThemeProvider({ children }: Props) {
  const theme = useSelector((state: RootState) => state.main.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  if (!theme) {
    return null;
  }

  const themez = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        input: {
          padding: '12px 14px'
        }
      },
      MuiInputLabel: {
        outlined: {
          transform: 'translate(14px, 15px) scale(1)'
        }
      }
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: primaryColor,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        // light: 'rgb(25, 161, 26)',
        main: primaryColor,
        // dark: will be calculated from palette.secondary.main,
        // contrastText: '#fff',
      },
    },
  });

  return <ThemeProvider theme={themez}>{children}</ThemeProvider>;
}

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
