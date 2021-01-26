import { FilterParams } from '../../home/actions';
import { Apartment } from '../Apartment';

export const FETCH_APARTMENT = 'FETCH_APARTMENT';
export const SEARCH_APARTMENT = 'SEARCH_APARTMENT';
export const SET_APARTMENT = 'SET_APARTMENT';
export const FETCH_APARTMENT_FAILED = 'FETCH_APARTMENT_FAILED';

export type FetchApartmentAction = {
  type: typeof FETCH_APARTMENT;
  payload: FilterParams;
};

export type StartFetchingApartmentAction = {
  type: typeof SEARCH_APARTMENT;
};

export type SetApartmentAction = {
  type: typeof SET_APARTMENT;
  payload: Apartment[];
};

export type FetchApartmentFailedAction = {
  type: typeof FETCH_APARTMENT_FAILED;
};

export type HomeActionTypes =
  | FetchApartmentAction
  | StartFetchingApartmentAction
  | SetApartmentAction
  | FetchApartmentFailedAction;
