import { combineReducers } from "redux";
import libraries from "./libraries";
import library from "./library";
import admin from "./admin";
import validation from "./validation";

import { FetchEditState } from "./createFetchEditReducer";

import {
  LibrariesData,
  LibraryData,
  ValidationData,
  AdminData
} from "../interfaces";

export interface State {
  libraries: FetchEditState<LibrariesData>;
  library: FetchEditState<LibraryData>;
  admin: FetchEditState<AdminData>;
  validation: FetchEditState<ValidationData>;
}

export default combineReducers<State>({
  libraries,
  library,
  admin,
  validation
});
