import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox';
import SearchContainer from './SearchContainer';

const Index = () => (
  <div>
    Hello React!
    <SearchContainer>
      {({ isOpen, onClick }) => <SearchBox isOpen={isOpen} onClick={onClick} />}
    </SearchContainer>
  </div>
);

ReactDOM.render(<Index />, document.getElementById('app'));
