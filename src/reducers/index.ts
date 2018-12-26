import { combineReducers } from "redux";
import libraries from "./libraries";

import { FetchEditState } from "./createFetchEditReducer";
import { RegisterLibraryState } from "./createRegisterLibraryReducer";

import {
  LibrariesData
} from "../interfaces";


export interface State {
  libraries: FetchEditState<LibrariesData>;
}

export default combineReducers<State>({

  libraries

});
