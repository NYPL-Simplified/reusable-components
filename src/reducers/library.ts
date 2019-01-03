import { LibraryData } from "../interfaces";
import ActionCreator from "../actions";
import createFetchEditReducer from "./createFetchEditReducer";

export default createFetchEditReducer<LibraryData>(
  ActionCreator.GET_ONE_LIBRARY,
  ActionCreator.EDIT_STAGES
);
