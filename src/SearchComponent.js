import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SearchBox from './SearchBox';
import SearchContainer from './SearchContainer';

const SearchComponent = ({ classes }) => (
  <SearchContainer>
    {({ isOpen, onClick, clickOutside }) => (
      <React.Fragment>
        <div className={classNames(classes.root, { open: isOpen })}>
          <SearchBox isOpen={isOpen} onClick={onClick} clickOutside={clickOutside} />
        </div>
      </React.Fragment>
    )}
  </SearchContainer>
);

const useStyles = withStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '2s ease all',
    '&.open': {
      background: '#1eaddc',
    },
  },
});

export default useStyles(SearchComponent);
