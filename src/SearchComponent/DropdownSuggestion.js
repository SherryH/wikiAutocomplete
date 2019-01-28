import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DropdownSuggestion = ({
  classes, dropdownData, toggledClass, selectDropdown,
}) => (
  <ul className={classNames(toggledClass, { [classes.dropdownWrapper]: true })}>
    {dropdownData.map(dropdownItem => (
      <li key={dropdownItem} onClick={() => selectDropdown(dropdownItem)}>
        {dropdownItem}
      </li>
    ))}
  </ul>
);

export default DropdownSuggestion;

DropdownSuggestion.propTypes = {
  selectDropdown: PropTypes.func,
  toggledClass: PropTypes.object,
  classes: PropTypes.any,
  dropdownData: PropTypes.arrayOf(PropTypes.string),
};
