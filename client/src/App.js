import graphql from 'babel-plugin-relay/macro'
import { Link } from "found";
import React from "react";
import { QueryRenderer } from 'react-relay'

import logo from "./logo.svg";
import { environment } from "./graphql";
import "./App.css";


import { commitMutation } from 'react-relay'

function addToDescription() {
  commitMutation(environment, {
    mutation: graphql`
      mutation AppUpdateCourseDescriptionMutation($input: UpdateCourseDescriptionInput!) {
        updateCourseDescription(input: $input) {
          course {
            id
            description
          }
        }
      }
    `,
    variables: { input: { id: btoa('Course:1234'), description: 'Updated everywhere' }},
    // onCompleted: (response, errors) => {
    //   if (mutationParams.onCompleted) {
    //     mutationParams.onCompleted(response, errors)
    //   }

    //   if (errors) {
    //     const defaultError = {
    //       message: 'Oops, something went wrong. Please try again later.',
    //     }

    //     // Find the first error in the graphql payload that has either a message or validation errors
    //     const error: {
    //       message?: string
    //       validationErrors?: { [k: string]: string }
    //     } =
    //       errors.find((e) => 'message' in e || 'validationErrors' in e) ||
    //       defaultError

    //     reject(error)
    //   } else {
    //     resolve(response)
    //   }
    // },
    // onError: (error) => {
    //   if (mutationParams.onError) {
    //     mutationParams.onError(error)
    //   }
    //   reject({
    //     message: 'We are experiencing network issues. Please try again later.',
    //   })
    // },
  })
}


export function App({ children }) {
  const render = ({ error, props }) => props ? props.courses.map(c => <li key={c.id}><Link to={`/courses/${atob(c.id).split(':')[1]}`}>{c.title}</Link></li>) : <h1>Loading...</h1>

  let nestedQR = <QueryRenderer
      environment={environment}
      query={graphql`
        query AppSidebarQuery {
          courses {
            id
            title
          }
        }`
      }
      render={render}
    />

  return (
    <div className="App">
      <nav className="Sidebar">
        <h2>Courses</h2>
        <ul>
          <li key="0">
            <Link to="/">Overview</Link>
          </li>
          {nestedQR}
          <li key="button">
            <button onClick={addToDescription}>Mutate description</button>
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
  if (!props) { return <h1>Loading...</h1>}
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
    <h1>{props.course.title}</h1>
    <p>{props.course.description}</p>
    <pre>{JSON.stringify(props)}</pre>
    {nestedQR}
  </>;
}
