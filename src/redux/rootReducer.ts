import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import homeReducer, { HomeState } from "./home/reducer";

export interface AppState {
  home: HomeState
}

const rootReducer = combineReducers<AppState>({
  home: homeReducer,
});

export default rootReducer;
