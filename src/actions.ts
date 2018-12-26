import {

  LibrariesData

} from "./interfaces";
import DataFetcher from "opds-web-client/lib/DataFetcher";
import { RequestError, RequestRejector } from "opds-web-client/lib/DataFetcher";
import BaseActionCreator from "opds-web-client/lib/actions";

/** Create redux actions to be dispatched by connected components, mostly
    to make requests to the server. */
export default class ActionCreator extends BaseActionCreator {

  static readonly GET_ALL_LIBRARIES = "GET_ALL_LIBRARIES";


  csrfToken: string;

  constructor(fetcher?: DataFetcher, csrfToken?: string) {
    fetcher = fetcher || new DataFetcher();
    super(fetcher);
    csrfToken = csrfToken || null;
    this.csrfToken = csrfToken;
  }

  fetchLibraries() {
    let url = "/admin/libraries";
    return this.fetchJSON<LibrariesData>(ActionCreator.GET_ALL_LIBRARIES, url).bind(this);
  }









  postForm(
    type: string,
    url: string,
    data: FormData | null,
    method?: string,
    defaultErrorMessage?: string,
    returnType?: string,
  ) {
    let err: RequestError;
    return (dispatch => {
      return new Promise((resolve, reject: RequestRejector) => {
        dispatch(this.request(type));
        let headers = new Headers();
        if (this.csrfToken) {
          headers.append("X-CSRF-Token", this.csrfToken);
        }
        fetch(url, {
          method: method || "POST",
          headers: headers,
          body: data,
          credentials: "same-origin"
        }).then(response => {
          if (response.status === 200 || response.status === 201) {
            dispatch(this.success(type));
            if (response.json && returnType === "JSON") {
              response.json().then(data => {
                dispatch(this.load<any>(type, data));
                resolve(response);
              });
            } else if (response.text) {
              response.text().then(text => {
                dispatch(this.load<string>(type, text));
                resolve(response);
              });
            } else {
              resolve(response);
            }
          } else {
            response.json().then(data => {
              err = {
                status: response.status,
                response: data.detail,
                url: url
              };
              dispatch(this.failure(type, err));
              reject(err);
            }).catch(parseError => {
              err = {
                status: response.status,
                response: defaultErrorMessage || "Failed to save changes",
                url: url
              };
              dispatch(this.failure(type, err));
              reject(err);
            });
          }
        }).catch(err => {
          err = {
            status: null,
            response: err.message,
            url: url
          };
          dispatch(this.failure(type, err));
          reject(err);
        });
      });
    }).bind(this);
  }

  postJSON<T>(type: string, url: string, data: T) {
    let err: RequestError;
    return (dispatch => {
      return new Promise((resolve, reject: RequestRejector) => {
        dispatch(this.request(type, url));
        let headers = new Headers();
        if (this.csrfToken) {
          headers.append("X-CSRF-Token", this.csrfToken);
        }
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "same-origin"
        }).then(response => {
          if (response.status === 200 || response.status === 201) {
            dispatch(this.success(type));
            resolve(response);
          } else {
            response.json().then(data => {
              err = {
                status: response.status,
                response: data.detail,
                url: url
              };
              dispatch(this.failure(type, err));
              reject(err);
            }).catch(parseError => {
              err = {
                status: response.status,
                response: "Request failed",
                url: url
              };
              dispatch(this.failure(type, err));
              reject(err);
            });
          }
        }).catch(err => {
          err = {
            status: null,
            response: err.message,
            url: url
          };
          dispatch(this.failure(type, err));
          reject(err);
        });
      });
    });
  }


}
