import firestore from '@react-native-firebase/firestore';
import { MAX_PRICE, MAX_SQUARE } from '../../utils/constants';
import { SEARCH_APARTMENT, SET_APARTMENT } from "../types/actions/home"

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  minSquare?: number;
  maxSquare?: number;
  bedrooms?: number;
}

export const fetchApartmentsWithFilter = <FilterParams>(
  minPrice = 0,
  maxPrice = MAX_PRICE,
  minSquare = 0,
  maxSquare = MAX_SQUARE,
  bedrooms = 0) => {
  return async (dispatch: any) => {
    fetch('http://localhost:3002/fetch', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        minPrice,
        maxPrice,
        minSquare,
        maxSquare,
        bedrooms
      })
    })
      .then((res) => res.json())
      .then(res => {
        dispatch({
          type: SET_APARTMENT,
          payload: res.result.map((i: any) => ({
            ...i,
            images: JSON.parse(i.images)
          }))
        })
      })
  }
}