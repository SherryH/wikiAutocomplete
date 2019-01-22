import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { TextField, IconButton, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import onhandleClickOutside from 'react-onclickoutside';
import { fromEvent } from 'rxjs';
import DropdownSuggestion from './DropdownSuggestion';

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
      fill: primaryBlue,
    },
  },
  wrapper: {
    border: `1px solid ${primaryBlue}`,
    width: 65,
    borderRadius: '50%',
    background: primaryBlue,
    boxShadow: '0 10px 30px #d0d0d0',
    transition: '0.15s ease width',
    '&.open': {
      display: 'flex',
      borderRadius: '20%/110%',
      width: 380,
      background: 'white',
      padding: '2px 30px',
      position: 'relative',
    },
  },
  dropdownWrapper: {
    position: 'absolute',
    top: '68px',
    listStyle: 'none',
    border: '1px solid #999',
    width: 'calc(350px)',
    marginTop: '0',
    padding: '4px',
    maxHeight: '143px',
    overflowY: 'auto',
    background: 'white',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0 10px 30px #999',
    '& li': {
      padding: '0.3rem',
      borderBottom: '1px solid #eee',
      background: 'white',
      '&:last-child': {
        borderBottom: 0,
      },
      '&:hover': {
        backgroundColor: primaryBlue,
        color: 'white',
        cursor: 'pointer',
        fontWeight: 700,
      },
    },
  },
});

const SearchBox = (props) => {
  const {
    classes,
    isOpen,
    onClick,
    searchWiki,
    onChange,
    searchValue,
    getSearchInput,
    dropdownData,
    selectDropdown,
  } = props;

  const toggledClass = { [classes.open]: isOpen, [classes.closed]: !isOpen };

  // reference to SearchBox
  const searchInput = document.getElementById('searchInput');
  // TODO: investigate how to refer to DOM using ref. Where to refactor to
  const searchInputRef = React.createRef();
  getSearchInput(searchInputRef);
  // const searchInput = searchInputRef.current;
  // console.log('searchInput', searchInput, searchInputRef);
  const searchInput$ = fromEvent(searchInput, 'keyup');
  return (
    <React.Fragment>
      <form
        className={classNames(classes.wrapper, { open: isOpen })}
        onSubmit={() => searchWiki(searchValue)}
        autoComplete="off"
      >
        <IconButton
          data-testid="show-autocomplete"
          aria-label="Show autocomplete"
          onClick={onClick}
          className={classNames({ [classes.show]: !isOpen, [classes.closed]: isOpen })}
        >
          <Search className={classNames(classes.icon, { open: isOpen })} />
        </IconButton>
        <input
          id="searchInput"
          data-testid="searchInput"
          ref={searchInputRef}
          onChange={(event) => {
            onChange(event, searchInput$);
          }}
          value={searchValue}
          className={classNames(toggledClass)}
          placeholder="Start Wiki Search..."
        />
        {dropdownData && dropdownData.length > 0 && (
          <DropdownSuggestion
            classes={classes}
            dropdownData={dropdownData}
            toggledClass={toggledClass}
            selectDropdown={selectDropdown}
          />
        )}
        <IconButton
          aria-label="Search"
          onClick={() => searchWiki(searchValue)}
          className={classNames({ [classes.show]: isOpen, [classes.closed]: !isOpen })}
        >
          <Search className={classNames(classes.icon, { open: isOpen })} />
        </IconButton>
      </form>
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
  dropdownData: PropTypes.arrayOf(PropTypes.string),
};
