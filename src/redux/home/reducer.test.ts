import 'react-native';
import { SetApartmentAction, SET_APARTMENT } from '../types/actions/home';
import homeReducer from './reducer';
import { Apartment } from '../types/Apartment';

it('Home reducers works correctly', () => {
  const MockFilteredApartment: Apartment[] = [
    {
      id: 'testID',
      title: 'Test Title',
      price: 200,
      sqm: 200,
      bedrooms: 2,
      images: ['image1', 'image2'],
    },
  ];
  const action: SetApartmentAction = {
    type: SET_APARTMENT,
    payload: MockFilteredApartment,
  };
  const state = homeReducer(undefined, action);
  expect(state).toMatchObject({ apartments: MockFilteredApartment });
});
