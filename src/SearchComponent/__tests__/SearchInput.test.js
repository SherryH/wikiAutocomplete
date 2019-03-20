import React from 'react';
import {
  render, fireEvent, cleanup,
} from 'react-testing-library';

let SearchInput;
let input$;

beforeAll(() => {
  jest.doMock('rxjs'); // mock the libraries used by SearchInput
  jest.doMock('jsonp');
  SearchInput = jest.requireActual('../SearchInput').default;
  // get the input$ from SearchInput to check whether it has been called as expected
  // since rxjs has been mocked above, the input$ here would be the mocked obj
  input$ = jest.requireActual('../SearchInput.js').input$;
});

afterAll(() => {
  jest.dontMock('jsonp');
  jest.dontMock('rxjs');
});

afterEach(cleanup);

describe('SearchInput:', () => {
  it('input$ subscribed when component is mounted', () => {
    render(
      <SearchInput />,
    );
    expect(input$.pipe).toHaveBeenCalledTimes(1);
    expect(input$.subscribe).toHaveBeenCalledTimes(1);
  });
  it('input$ emits search value correctly on input change', () => {
    const { getByTestId } = render(
      <SearchInput />,
    );
    const searchInput = getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'Git' } });
    expect(input$.next).toHaveBeenLastCalledWith('Git');
  });
});
