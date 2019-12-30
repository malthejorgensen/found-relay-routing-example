from flask import Flask, escape, request
from flask_graphql import GraphQLView

from schema import schema


app = Flask(__name__)


@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/graphql', methods=['GET', 'POST'])
def api_graphql_web():
    return GraphQLView.as_view('graphql', schema=schema, graphiql=True, middleware=[])()
