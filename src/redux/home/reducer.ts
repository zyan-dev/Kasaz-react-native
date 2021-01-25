import {
  HomeActionTypes,
  SEARCH_APARTMENT,
  SET_APARTMENT,
} from '../types/actions/home';
import { Apartment } from '../types/Apartment';

export interface HomeState {
  apartments: Apartment[];
  loading: boolean;
}

const InitialState = {
  apartments: [],
  loading: false,
};

export default function homeReducer(
  state: HomeState = InitialState,
  action: HomeActionTypes
): HomeState {
  switch (action.type) {
    case SEARCH_APARTMENT:
      return {
        ...state,
        loading: true,
      };
    case SET_APARTMENT:
      return {
        ...state,
        loading: false,
        apartments: action.payload,
      };
    default:
      return state;
  }
}
