import { FETCH_APARTMENT } from '../types/actions/home';

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  minSquare?: number;
  maxSquare?: number;
  bedrooms?: number;
}

export const fetchApartmentsWithFilter = (params: FilterParams) => {
  return {
    type: FETCH_APARTMENT,
    payload: params,
  };
};
