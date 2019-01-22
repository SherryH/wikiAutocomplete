import React from 'react';

const input$ = new Subject();

// substitude this input into SearchContainer and make sure it still works
// then slowly refactor to use subject

class SearchInput extends React.PureComponent {
  render() {
    const { searchInput$, searchValue, toggledClass } = this.props;
    return (
      <input
        id="searchInput"
        ref={searchInputRef}
        onChange={(event) => {
          onChange(event, searchInput$);
        }}
        value={searchValue}
        className={classNames(toggledClass)}
        placeholder="Start Wiki Search..."
      />
    );
  }
}

export default SearchInput;
