import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, filter, switchMap,
} from 'rxjs/operators';
import jsonp from 'jsonp';

const input$ = new Subject();

// substitude this input into SearchContainer and make sure it still works
// then slowly refactor to use subject

class SearchInput extends React.PureComponent {
  state = {
    searchValue: '',
  }

  componentDidMount() {
    const { searchValue } = this.state;
    const { setDropdownData } = this.props;
    input$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => searchValue.length > 0),
        switchMap(() => this.getJsonpAsync(searchValue)),
      )
      .subscribe((dropdownData) => {
        setDropdownData(dropdownData);
      });
  }

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value }, () => {
      const { searchValue } = this.state;
      input$.next(searchValue);
    });
  }

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
    const {
      toggledClass,
    } = this.props;
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
  // searchValue: PropTypes.string.isRequired,
  toggledClass: PropTypes.object.isRequired,
  setDropdownData: PropTypes.func.isRequired,
};
