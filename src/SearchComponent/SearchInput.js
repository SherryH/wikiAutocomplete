import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged,
} from 'rxjs/operators';
import jsonp from 'jsonp';

export const input$ = new Subject();

class SearchInput extends React.PureComponent {
  state = {
    searchValue: '',
  };

  componentDidMount() {
    const { setDropdownData } = this.props;
    input$
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
      )
      .subscribe((searchValue) => {
        this.getJsonpAsync(searchValue).then((dropdownData) => {
          setDropdownData(dropdownData);
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ searchValue: this.props.searchValue });
    }
  }

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value }, () => {
      const { searchValue } = this.state;
      input$.next(searchValue);
    });
  };

  getJsonpAsync = term => new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${term}&namespace=0&limit=10&suggest=true`;
    jsonp(url, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data[1]);
    });
  });

  render() {
    const { toggledClass } = this.props;
    const { searchValue } = this.state;
    return (
      <input
        data-testid="searchInput"
        id="searchInput"
        onChange={this.handleChange}
        value={searchValue}
        className={classNames(toggledClass)}
        placeholder="Start Wiki Search..."
      />
    );
  }
}

export default SearchInput;

SearchInput.propTypes = {
  toggledClass: PropTypes.object,
  setDropdownData: PropTypes.func,
  searchValue: PropTypes.string,
};

SearchInput.defaultProps = {
  toggledClass: {},
  setDropdownData: () => {},
  searchValue: '',
};
