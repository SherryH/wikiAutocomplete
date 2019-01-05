import React from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import { from, Observable } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map, mergeAll, switchMap,
} from 'rxjs/operators';

// Define Observables
// const searchInput = document.getElementById('searchInput');
// console.log('searchInput', searchInput);
// const searchInput$ = fromEvent(searchInput, 'click');

// render props, pass the states into children
class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput$ = null;
    this.searchInputSubscriber = null;
  }

  state = {
    isOpen: false,
    searchValue: '',
    searchInput: null,
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

  searchWiki = (term) => {
    // const term = 'Harari';
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${term}&namespace=0&limit=10&suggest=true`;
    return this.getJsonpAsync(term, url).then(data => console.log('auto dropdown', data));
  };

  getWikiObservable = (term) => {
    console.log('getWiki called');
    let cancelled = false;
    return Observable.create((observer) => {
      const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${term}&namespace=0&limit=10&suggest=true`;
      const jsonPFunc = function (error, jsonpData) {
        console.log('jsonpData', jsonpData[1]);
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
      // console.log('repeat?', this.searchInput$);
      // this.searchInput$.pipe(debounceTime(500)).subscribe((event) => {
      //   console.log('data is event? YES!', event.key);
      //   // get input.value() from SearchBox
      //   console.log('input value', this.state.searchValue);
      //   // send input.value() to searchWiki
      //   // from(searchWiki()) -> changes to observable
      // });
    });
  };

  getSearchInput = (searchInput) => {
    console.log('searchInput passed from SearchBox', searchInput);
    // this.setState({ searchInput });
  };

  componentWillUnmount() {
    this.searchInputSubscriber.unsubscribe();
  }

  componentDidUpdate() {
    if (!this.searchInput$) return;
    console.log('how many?');
    const wiki$ = this.getWikiObservable(this.state.searchValue);
    wiki$.subscribe((data) => {
      console.log('wikidata', data);
    });
    this.searchInputSubscriber = this.searchInput$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => this.getWikiObservable(this.state.searchValue)),
      )
      .subscribe((wikiData) => {
        // from(this.searchWiki(this.state.searchValue))
        //   .pipe(mergeAll())
        //   .subscribe((data) => {
        //     console.log('returned wiki data', data);
        //   });

        // console.log('data is event? YES!', event.key);
        // get input.value() from SearchBox
        console.log('input value', this.state.searchValue);
        console.log('dropdown', wikiData);
        // send input.value() to searchWiki
        // from(searchWiki()) -> changes to observable
      });
  }

  getStateAndHelpers() {
    const { isOpen, searchValue } = this.state;
    return {
      isOpen,
      onClick: this.onClick,
      handleClickOutside: this.handleClickOutside,
      searchWiki: this.searchWiki,
      onChange: this.onChange,
      searchValue,
      getSearchInput: this.getSearchInput,
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
