import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBox from './SearchBox';
import SearchContainer from './SearchContainer';

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
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

const Index = ({ classes }) => (
  <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <SearchContainer>
        {({ isOpen, onClick }) => <SearchBox isOpen={isOpen} onClick={onClick} />}
      </SearchContainer>
    </div>
  </MuiThemeProvider>
);

const StyledIndex = withStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})(Index);

ReactDOM.render(<StyledIndex />, document.getElementById('app'));
