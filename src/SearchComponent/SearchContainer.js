import React from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import { from, Observable } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map, filter, switchMap,
} from 'rxjs/operators';

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
    searchInput: null,
  };


  componentDidUpdate() {
    const { searchValue } = this.state;
    console.log('componentDidUpdate in test? ', this.searchInput$);
    if (!this.searchInput$) return;
    this.searchInputSubscriber = this.searchInput$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => searchValue.length > 0),
        switchMap(() => {
          this.wikiSubscriber = this.getWikiObservable(searchValue);
          return this.wikiSubscriber;
        }),
      )
      .subscribe((dropdownData) => {
        // TODO: why from(promise) or(promise) doesnt work?
        // from(this.searchWiki(this.state.searchValue))
        //   .pipe(mergeAll())
        //   .subscribe((data) => {
        //     console.log('returned wiki data', data);
        //   });
        console.log('TODO: observable subscribe run increments', this.state.searchValue);

        this.setState({ dropdownData });
      });
  }

  componentWillUnmount() {
    if (this.searchInputSubscriber) this.searchInputSubscriber.unsubscribe();
    if (this.wikiSubscriber) this.wikiSubscriber.unsubscribe();
  }

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


  getWikiObservable = (term) => {
    let cancelled = false;
    return Observable.create((observer) => {
      const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${term}&namespace=0&limit=10&suggest=true`;
      const jsonPFunc = function (error, jsonpData) {
        if (error) observer.error(error);
        if (!cancelled) {
          observer.next(jsonpData[1]);
          observer.complete();
        }
      };
      jsonp(url, jsonPFunc);

      return function dispose() {
        cancelled = true;
      };
    });
  };

  onChange = (event, searchInput$) => {
    if (!this.searchInput$) {
      this.searchInput$ = searchInput$;
    }
    this.setState({ searchValue: event.target.value }, () => {
    });
  };

  selectDropdown = (dropdownList) => {
    this.setState({ searchValue: dropdownList, dropdownData: [] });
    // TODO: cursor still not displayed
    if (this.searchInputRef) this.searchInputRef.current.focus();
  }

  getSearchInput = (searchInputRef) => {
    // TODO: find the best place to define searchInputRef
    // passed through in onChange or another place?
    // Note: constructor() doesnt work as SearchBox not yet exist when SearchContainer defined
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
      selectDropdown: this.selectDropdown,
    };
  }

  searchWiki = (term) => {
    const url = `https://en.wikipedia.org/w/index.php?search=${encodeURI(term)}`;
    window.open(url, '_blank');
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
