import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route
} from "found";
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { App, CoursePage, DefaultPage } from "./App";
import * as serviceWorker from "./serviceWorker";

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={App}>
      <Route Component={DefaultPage} />
      <Route path="courses/:courseId" Component={CoursePage} />
    </Route>
  ),

  renderError: ({ error }) => (
    <div>{error.status === 404 ? "Not found" : "Error"}</div>
  )
});

ReactDOM.render(<BrowserRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
