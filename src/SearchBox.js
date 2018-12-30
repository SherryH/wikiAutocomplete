import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { TextField, IconButton } from '@material-ui/core';

const SearchBox = ({ isOpen }) => {
  const baseStyle = {
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
      border: '1px solid',
      borderRadius: 4,
    },
  };
  const textStyle = isOpen ? baseStyle.open : baseStyle.closed;
  const frameWidth = isOpen ? 80 : 50;
  const frameStyle = { ...baseStyle.frame, ...{ width: textStyle.width + frameWidth } };
  return (
    <div style={frameStyle}>
      <IconButton aria-label="Search">
        <Search style={textStyle.icon} />
      </IconButton>

      <TextField style={textStyle} />
    </div>
  );
};
export default SearchBox;

SearchBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
