import graphql from 'babel-plugin-relay/macro'
import { Route } from "found";
import React from "react";


import { App, CoursePage, DefaultPage } from "./App";

const Routes = <Route path="/" Component={App}>
    <Route Component={DefaultPage} />
    <Route
      path="courses/:courseId"
      Component={CoursePage}
      query={graphql`
        query RoutesQuery($courseId: ID!) { 
          course(id: $courseId) {
            id
            title
            description
          }
        }`
      }
      prepareVariables={(props) => ({courseId: btoa(`Course:${props.courseId}`)})}
    />
  </Route>

export default Routes
