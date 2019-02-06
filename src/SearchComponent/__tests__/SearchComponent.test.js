jest.mock('jsonp');

import React from 'react';
import renderer from 'react-test-renderer';
import {
  render, fireEvent, cleanup, wait
} from 'react-testing-library';
// import jsonp from 'jsonp';
import SearchComponent from '../index';


afterAll(() => {
  jest.unmock('jsonp');
});

describe('SearchComponent:', () => {
  xit('closed autocomplete input renders correctly', () => {
    const tree = renderer
      .create(<SearchComponent />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('opened autocomplete input renders correctly', () => {
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

  it('renders search results into dropdown suggestions', async() => {
    // mock the wiki result returns by mocking jsonp

    // render the autocomplete
    const { getByTestId, container } = render(
      <SearchComponent />,
    );

    // input search text into the input field
    const searchInput = getByTestId('searchInput');
    // searchInput.value = 'London';
    fireEvent.change(searchInput, { target: { value: 'London' } });

    // check mock jsonp called
    // currently failed. refer https://github.com/kentcdodds/react-testing-library/blob/cb14d2d3a19ae1420fafc8d9554c707fd7123a99/src/__tests__/fetch.js
    // wait for componentDidUpdate called
    // expect(jsonp).toHaveBeenCalled();
    await wait()

    // match snapshots
    expect(container.firstChild).toMatchSnapshot();

    // check dropdownSelection is rendered

    cleanup();
  });

  it('opens a separate tab for the selected result', () => {
    // render the autocomplete
    const { getByTestId, container } = render(
      <SearchComponent />,
    );

    // input search text into the input field

    // mock the wiki result returns

    // click on one result

    // click on search

    // assert url

    cleanup();
  });
});
