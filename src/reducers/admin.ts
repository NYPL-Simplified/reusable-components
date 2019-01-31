import { AdminData } from "../interfaces";
import ActionCreator from "../actions";
import createFetchEditReducer from "./createFetchEditReducer";

export default createFetchEditReducer<AdminData>(
  ActionCreator.LOG_IN
);
