import 'react-native';
import { fetchApartmentsWithFilter } from './actions';
import { FETCH_APARTMENT } from '../types/actions/home';

it('Home actions works correctly', () => {
  const mockFilterParams = {
    minPrice: 0,
    maxPrice: 10000,
    minSquare: 0,
    maxSquare: 10000,
    bedrooms: 1,
  };
  const action = fetchApartmentsWithFilter(mockFilterParams);
  expect(action).toEqual({ type: FETCH_APARTMENT, payload: mockFilterParams });
});
