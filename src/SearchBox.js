import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { TextField, IconButton, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import onClickOutside from 'react-onclickoutside';

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
    '&.open': {
      display: 'flex',
      borderRadius: '20%/95%',
      width: 380,
      background: 'white',
      padding: '2px 30px',
    },
  },
});

const SearchBox = (props) => {
  const { classes, isOpen, onClick } = props;

  const toggledClass = { [classes.open]: isOpen, [classes.closed]: !isOpen };

  return (
    <React.Fragment>
      <div className={classNames(classes.wrapper, { open: isOpen })}>
        <IconButton aria-label="Search" onClick={onClick}>
          <Search className={classNames(classes.icon, { open: isOpen })} />
        </IconButton>
        <input className={classNames(toggledClass)} placeholder="Start Wiki Search..." />
      </div>
    </React.Fragment>
  );
};
export default onClickOutside(useStyles(SearchBox), {
  handleClickOutside(instance) {
    return () => {
      instance.props.clickOutside();
    };
  },
});

SearchBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  clickOutside: PropTypes.func.isRequired,
  classes: PropTypes.any,
};
