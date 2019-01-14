import { combineReducers } from "redux";
import libraries from "./libraries";
import library from "./library";
import admin from "./admin";

import { FetchEditState } from "./createFetchEditReducer";

import {
  LibrariesData,
  LibraryData,
  AdminData
} from "../interfaces";


export interface State {
  libraries: FetchEditState<LibrariesData>;
  library: FetchEditState<LibraryData>;
  admin: FetchEditState<AdminData>;
}

export default combineReducers<State>({
  libraries,
  library,
  admin
});
