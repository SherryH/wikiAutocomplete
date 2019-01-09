import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchComponent from './SearchComponent';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1eaddc',
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet to override
    MuiSvgIcon: {
      // Name of the rule
      root: {
        fill: 'white',
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const Index = () => (
  <MuiThemeProvider theme={theme}>
    <SearchComponent />
  </MuiThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById('app'));
