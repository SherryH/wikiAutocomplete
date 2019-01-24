import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, filter, switchMap,
} from 'rxjs/operators';
import jsonp from 'jsonp';

const input$ = new Subject();

class SearchInput extends React.PureComponent {
  state = {
    searchValue: '',
  };

  componentDidMount() {
    // const { searchValue } = this.state;
    const { setDropdownData } = this.props;
    input$
      .pipe(
        filter(searchValue => searchValue.length > 0),
        distinctUntilChanged(),
        debounceTime(500),
      )
      .subscribe((searchValue) => {
        this.getJsonpAsync(searchValue).then((dropdownData) => {
          setDropdownData(dropdownData);
        });
      });
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

  // onClick of a dropdown search result, SearchContainer.selectDropdown
  // set the selectDropdown to be the state.searchValue here
  // setState triggered by parent component SearchContainer.js
  // componentWillReceiveProps! see what the current impl is

  render() {
    const { toggledClass } = this.props;
    const { searchValue } = this.state;
    return (
      <input
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
  toggledClass: PropTypes.object.isRequired,
  setDropdownData: PropTypes.func.isRequired,
};
