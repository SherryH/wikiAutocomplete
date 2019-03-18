import React from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput$ = null;
    this.searchInputSubscriber = null;
    this.wikiSubscriber = null;
    this.searchInputRef = null;
  }

  state = {
    isOpen: false,
    searchValue: '',
    dropdownData: [],
  };

  onClick = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  getJsonpAsync = (term, url) => new Promise((resolve, reject) => {
    jsonp(url, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data[1]);
    });
  });

  setDropdownData = (dropdownData) => {
    this.setState({ dropdownData });
  };

  getStateAndHelpers() {
    const { isOpen, searchValue, dropdownData } = this.state;
    return {
      isOpen,
      onClick: this.onClick,
      handleClickOutside: this.handleClickOutside,
      searchWiki: this.searchWiki,
      onChange: this.onChange,
      searchValue,
      getSearchInput: this.getSearchInput,
      dropdownData,
      setDropdownData: this.setDropdownData,
      selectDropdown: this.selectDropdown,
    };
  }

  selectDropdown = (dropdownItem) => {
    this.setState({ searchValue: dropdownItem, dropdownData: [] });
  };

  handleClickOutside = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    return children(this.getStateAndHelpers());
  }
}

export default SearchContainer;

SearchContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
