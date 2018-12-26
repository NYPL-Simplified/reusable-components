import { LibrariesData } from "../interfaces";
import ActionCreator from "../actions";
import createFetchEditReducer from "./createFetchEditReducer";

export default createFetchEditReducer<LibrariesData>(ActionCreator.GET_ALL_LIBRARIES);
