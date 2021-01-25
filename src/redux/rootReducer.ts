import { combineReducers } from 'redux';
import homeReducer, { HomeState } from './home/reducer';

export interface AppState {
  home: HomeState;
}

const rootReducer = combineReducers<AppState>({
  home: homeReducer,
});

export default rootReducer;
