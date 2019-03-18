import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import onhandleClickOutside from 'react-onclickoutside';
import DropdownSuggestion from './DropdownSuggestion';
import SearchInput from './SearchInput';

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

const searchWiki = (term) => {
  const url = `https://en.wikipedia.org/w/index.php?search=${encodeURI(term)}`;
  window.open(url, '_blank');
};

const SearchBox = (props) => {
  const {
    classes,
    isOpen,
    onClick,
    searchValue,
    dropdownData,
    setDropdownData,
    selectDropdown,
  } = props;

  const toggledClass = { [classes.open]: isOpen, [classes.closed]: !isOpen };

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
        <SearchInput
          searchValue={searchValue}
          toggledClass={toggledClass}
          setDropdownData={setDropdownData}
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
  setDropdownData: PropTypes.func.isRequired,
  selectDropdown: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
  classes: PropTypes.any,
  dropdownData: PropTypes.arrayOf(PropTypes.string),
};
