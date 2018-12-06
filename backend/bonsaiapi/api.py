"""
api.py  
- provides the API endpoints for consuming and producing
  REST requests and responses
"""

from flask import Blueprint, jsonify, request, session

api = Blueprint('api', __name__)


@api.route('/hello/<string:name>/')
def say_hello(name):
    session['cashValue'] = 500.34
    response = {'msg': "Hello {}, you have ${}".format(
        name, session['cashValue'])}
    return jsonify(response)
