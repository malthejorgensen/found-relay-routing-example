import graphql from 'babel-plugin-relay/macro'
import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route
} from "found";
import { Resolver } from 'found-relay';
import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import { App, CoursePage, DefaultPage } from "./App";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";
import { environment } from "./graphql";

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(Routes),

  renderError: ({ error }) => (
    <div>{error.status === 404 ? "Not found" : "Error"}</div>
  )
});

ReactDOM.render(<BrowserRouter resolver={new Resolver(environment)} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
