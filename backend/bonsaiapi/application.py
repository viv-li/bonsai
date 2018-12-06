"""
application.py  
- creates a Flask app instance registers the api
"""

from flask import Flask
from flask_cors import CORS
from flask_restful import Api


def create_app(app_name='BONSAI_API'):
    app = Flask(app_name)
    app.config.from_object('bonsaiapi.config.BaseConfig')

    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    api = Api(app)
    from bonsaiapi.api import Cash
    api.add_resource(Cash, '/api/cash/')

    return app
