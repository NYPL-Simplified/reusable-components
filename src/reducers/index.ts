import { combineReducers } from "redux";
import libraries from "./libraries";
import library from "./library";

import { FetchEditState } from "./createFetchEditReducer";

import {
  LibrariesData,
  LibraryData,
} from "../interfaces";


export interface State {
  libraries: FetchEditState<LibrariesData>;
  library: FetchEditState<LibraryData>;
}

export default combineReducers<State>({
  libraries,
  library
});
