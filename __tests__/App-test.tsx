/**
 * @format
 */

import 'react-native';
import { Provider } from 'react-redux';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchInput from '../src/components/SearchInput';
import store from '../src/redux/store';
import ApartmentFilterView from '../src/containers/Home/components/ApartmentFilter';
import ApartmentItemView from '../src/containers/Home/components/ApartmentItemView';
import { Apartment } from '../src/redux/types/Apartment';

it('SearchInput component works correctly', () => {
  const mockFn = jest.fn();
  const SearchComponent = (
    <SearchInput onChange={mockFn} placeholder="MockInput" />
  );

  const { getByPlaceholderText } = render(SearchComponent);
  fireEvent.changeText(getByPlaceholderText('MockInput'), 'Test');
  expect(mockFn).toBeCalledWith('Test');
});

it('ApartmentItemView renders correctly', async () => {
  const mockFn = jest.fn();
  const mockApartment: Apartment = {
    id: 'TestID',
    title: 'Test Title',
    price: 100,
    sqm: 200,
    bedrooms: 2,
    images: ['image1', 'image2'],
  };
  const ApartmentItem = (
    <ApartmentItemView data={mockApartment} onPressZoom={mockFn} />
  );

  const { getByText, findAllByTestId } = render(ApartmentItem);
  let items = await findAllByTestId('image1');
  expect(items.length).toBeGreaterThan(1);
  items = await findAllByTestId('image2');
  expect(items.length).toBeGreaterThan(1);
  let item = getByText('100 €');
  expect(item).toBeTruthy();
  item = getByText('0.500 € / m²');
  expect(item).toBeTruthy();
  item = getByText('Test Title');
  expect(item).toBeTruthy();
  item = getByText('200 m²');
  expect(item).toBeTruthy();
  item = getByText('2 bedrooms');
  expect(item).toBeTruthy();
});

it('Filter redux works correctly', async () => {
  const mockFn = jest.fn();
  const mockParams = {
    minPrice: 100,
    maxPrice: 200,
    minSquare: 300,
    maxSquare: 400,
    bedrooms: 1,
  };
  const FilterComponent = (
    <Provider store={store}>
      <ApartmentFilterView visible params={mockParams} onSubmit={mockFn} />
    </Provider>
  );
  const { getByDisplayValue } = render(FilterComponent);
  expect(getByDisplayValue('100')).toBeTruthy();
  expect(getByDisplayValue('200')).toBeTruthy();
  expect(getByDisplayValue('300')).toBeTruthy();
  expect(getByDisplayValue('400')).toBeTruthy();
});
