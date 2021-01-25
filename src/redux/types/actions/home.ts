import { Apartment } from '../Apartment';

export const SEARCH_APARTMENT = 'SEARCH_APARTMENT';
export const SET_APARTMENT = 'SET_APARTMENT';

interface FetchApartmentAction {
  type: typeof SEARCH_APARTMENT;
}

interface SetApartmentAction {
  type: typeof SET_APARTMENT;
  payload: Apartment[];
}

export type HomeActionTypes = FetchApartmentAction | SetApartmentAction;
