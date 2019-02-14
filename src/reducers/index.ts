import { combineReducers } from "redux";
import libraries from "./libraries";
import library from "./library";
import admin from "./admin";
import email from "./email";

import { FetchEditState } from "./createFetchEditReducer";

import {
  LibrariesData,
  LibraryData,
  EmailData,
  AdminData
} from "../interfaces";

export interface State {
  libraries: FetchEditState<LibrariesData>;
  library: FetchEditState<LibraryData>;
  admin: FetchEditState<AdminData>;
  email: FetchEditState<EmailData>;
}

export default combineReducers<State>({
  libraries,
  library,
  admin,
  email
});
