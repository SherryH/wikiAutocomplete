import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox';

const Index = () => (
  <div>
    Hello React!
    {' '}
    <SearchBox isOpen />
    {' '}
  </div>
);

ReactDOM.render(<Index />, document.getElementById('app'));
