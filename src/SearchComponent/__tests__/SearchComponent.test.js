import React from 'react';
import renderer from 'react-test-renderer';
import {
  render, fireEvent, cleanup,
} from 'react-testing-library';
import SearchComponent from '../index';

describe('SearchComponent:', () => {
  it('closed autocomplete input renders correctly', () => {
    const tree = renderer
      .create(<SearchComponent />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('opened autocomplete input renders correctly', () => {
    const { getByTestId, container } = render(
      <SearchComponent />,
    );
    fireEvent.click(getByTestId('show-autocomplete'));
    expect(container.firstChild).toMatchSnapshot();
    cleanup();
  });
});
