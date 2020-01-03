Example of `found-relay` routing with mutation
==============================================

This is a small example that shows that `found-relay` is able to do queries at
the routing layer while also re-rendering those routes when a change is made
to the store client-side (from a mutation in some other component). 

`found-relay` does this automagically by using `environment.subscribe()`
and `ReactRelayContext` (from 'react-relay').


Setup
-----
1. In the `server` directory do `python -m .venv && . .venv/bin/activate && pip install -r requirements.txt`
2. In the `server` directory do `python print_schema.py`
3. Ensure that `client/schema.graphql` is a symlink to (or copy of) `server/schema.graphql`
4. In the `client` directory run `yarn install`
5. In the `client` directory run `yarn run relay`

Running the server
------------------
1. In the `server` directory do `env FLASK_DEBUG=1 FLASK_APP=app flask run`
2. In the `client` directory do `yarn start`
