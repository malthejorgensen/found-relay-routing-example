import graphql from 'babel-plugin-relay/macro'
import { Link } from "found";
import React from "react";
import { QueryRenderer } from 'react-relay'

import logo from "./logo.svg";
import { environment } from "./graphql";
import "./App.css";

export function App({ children }) {
  return (
    <div className="App">
      <nav className="Sidebar">
        <h2>Courses</h2>
        <ul>
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/courses/1234">Course 1234</Link>
          </li>
          <li>
            <Link to="/courses/abc">Course ABC</Link>
          </li>
        </ul>
      </nav>
      <div className="Content">{children}</div>  
    </div>
  );
}

export function DefaultPage() {
  return <h1>Please click a course in the sidebar</h1>;
}

function SmallCourse(props) {
  return (
    <h1>{props.course.title}</h1>
  )
}

export function CoursePage(props) {
  // return <pre>{JSON.stringify(props)}</pre>
  const title = props ? <h1>{props.course.title}</h1> : <h1>Loading...</h1>
  const render = ({ error, props }) => props ? <h1>{props.course.title}</h1> : <h1>Loading...</h1>
  let nestedQR = <QueryRenderer
      environment={environment}
      query={graphql`query AppQuery($courseId: ID!) { course(id: $courseId) { title } }`}
      variables={{courseId: btoa(`Course:${props.match.params.courseId}`)}}
      render={render}
    />
  nestedQR = null
  return <>
    {title}
    <pre>{JSON.stringify(props)}</pre>
    {nestedQR}
  </>;
}
