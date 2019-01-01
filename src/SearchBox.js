import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { TextField, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = withStyles({
  open: {
    width: 300,
  },
  closed: {
    width: 0,
  },
  icon: {
    width: 40,
    height: 40,
  },
  frame: {
    border: '1px solid #1eaddc',
    width: 65,
    borderRadius: '50%',
    background: '#1eaddc',
    '&.open': {
      borderRadius: 4,
      width: 380,
    },
  },
});

const SearchBox = (props) => {
  const { classes, isOpen, onClick } = props;

  const toggledClass = { [classes.open]: isOpen, [classes.closed]: !isOpen };

  return (
    <div className={classNames(classes.frame, { open: isOpen })}>
      <IconButton aria-label="Search" onClick={onClick}>
        <Search className={classes.icon} />
      </IconButton>

      <TextField className={classNames(toggledClass)} />
    </div>
  );
};
export default useStyles(SearchBox);

SearchBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.any,
};
