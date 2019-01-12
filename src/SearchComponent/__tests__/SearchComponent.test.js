import React from 'react';
import renderer from 'react-test-renderer';
import {
  render, fireEvent, cleanup, waitForElement,
} from 'react-testing-library';
import SearchComponent from '../index';

describe('SearchComponent', () => {
  it('closed autocomplete input renders correctly', () => {
    const tree = renderer
      .create(<SearchComponent />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('opened autocomplete input renders correctly', () => {
    // render the autocomplete
    const { getByTestId, container } = render(
      <SearchComponent />,
    );
    // click the button to open the autocomplete
    fireEvent.click(getByTestId('show-autocomplete'));
    // snapshot testing to match the opened state
    expect(container.firstChild).toMatchSnapshot();
    cleanup();
  });
});
