import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { TextField, IconButton, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import onhandleClickOutside from 'react-onclickoutside';
import { fromEvent } from 'rxjs';

const primaryBlue = '#1eaddc';

const useStyles = withStyles({
  open: {
    flex: 1,
    fontSize: 20,
    border: 0,
    '&:focus': {
      outline: 'none',
    },
  },
  closed: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
  icon: {
    width: 40,
    height: 40,
    '&.open': {
      fill: '#1eaddc',
    },
  },
  wrapper: {
    border: '1px solid #1eaddc',
    width: 65,
    borderRadius: '50%',
    background: '#1eaddc',
    boxShadow: '0 10px 30px #d0d0d0',
    transition: '0.15s ease width',
    '&.open': {
      display: 'flex',
      borderRadius: '20%/110%',
      width: 380,
      background: 'white',
      padding: '2px 30px',
    },
  },
});

const SearchBox = (props) => {
  const {
    classes, isOpen, onClick, searchWiki, onChange,
  } = props;

  const toggledClass = { [classes.open]: isOpen, [classes.closed]: !isOpen };

  // reference to SearchBox
  const searchInput = document.getElementById('searchInput');
  // let searchInputRef = React.createRef();
  // const searchInput = searchInputRef.current;
  // console.log('searchInput', searchInput, searchInputRef);
  const searchInput$ = fromEvent(searchInput, 'keyup');
  return (
    <React.Fragment>
      <div className={classNames(classes.wrapper, { open: isOpen })}>
        <IconButton
          aria-label="Show autocomplete"
          onClick={onClick}
          className={classNames({ [classes.show]: !isOpen, [classes.closed]: isOpen })}
        >
          <Search className={classNames(classes.icon, { open: isOpen })} />
        </IconButton>
        <input
          id="searchInput"
          // ref={searchInputRef}
          onChange={(event) => {
            onChange(searchInput$);
          }}
          className={classNames(toggledClass)}
          placeholder="Start Wiki Search..."
        />
        <IconButton
          aria-label="Search"
          onClick={searchWiki}
          className={classNames({ [classes.show]: isOpen, [classes.closed]: !isOpen })}
        >
          <Search className={classNames(classes.icon, { open: isOpen })} />
        </IconButton>
      </div>
    </React.Fragment>
  );
};
export default onhandleClickOutside(useStyles(SearchBox), {
  handlehandleClickOutside(instance) {
    return () => {
      instance.props.handleClickOutside();
    };
  },
});

SearchBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
  classes: PropTypes.any,
};
