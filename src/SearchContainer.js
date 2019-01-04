import React from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import { debounceTime } from 'rxjs/operators';

// Define Observables
// const searchInput = document.getElementById('searchInput');
// console.log('searchInput', searchInput);
// const searchInput$ = fromEvent(searchInput, 'click');

// render props, pass the states into children
class SearchContainer extends React.Component {
  state = {
    isOpen: false,
  };

  onClick = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  handleClickOutside = () => {
    this.setState({
      isOpen: false,
    });
  };

  // create a Search handler, make fetch request to wiki, get response
  // then use onChange
  getJsonpAsync = (term, url) => new Promise((resolve, reject) => {
    jsonp(url, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data[1]);
    });
  });

  searchWiki = () => {
    const term = 'Harari';
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${term}&namespace=0&limit=10&suggest=true`;
    this.getJsonpAsync(term, url).then(data => console.log('auto dropdown', data));
  };

  onChange = (searchInput$) => {
    searchInput$.pipe(debounceTime(500)).subscribe((event) => {
      console.log('data is event? YES!', event.key);
    });
  };

  getStateAndHelpers() {
    const { isOpen } = this.state;
    return {
      isOpen,
      onClick: this.onClick,
      handleClickOutside: this.handleClickOutside,
      searchWiki: this.searchWiki,
      onChange: this.onChange,
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
