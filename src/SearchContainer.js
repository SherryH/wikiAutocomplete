import React from 'react';
import PropTypes from 'prop-types';

// render props, pass the states into children
class SearchContainer extends React.Component {
  state = {
    isOpen: true,
  };

  onClick = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  getStateAndHelpers() {
    const { isOpen } = this.state;
    return {
      isOpen,
      onClick: this.onClick,
    };
  }

  render() {
    const { children } = this.props;
    return children(this.getStateAndHelpers());
  }
}

export default SearchContainer;

SearchContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
