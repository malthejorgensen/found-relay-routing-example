import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import { GraphQLTaggedNode, OperationType } from 'relay-runtime'
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  RequestParameters,
  Store,
  SubscribeFunction,
  Variables,
} from 'relay-runtime'


const fetchQuery = (
  operation,
  variables,
) => {
  return fetch('http://localhost:5000/graphql', {
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) =>
    response.json().then((jsonResponse) => {
      return jsonResponse
    }),
  )
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})
