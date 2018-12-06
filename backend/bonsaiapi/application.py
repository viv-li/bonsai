"""
application.py  
- creates a Flask app instance registers the api
"""

from flask import Flask


def create_app(app_name='BONSAI_API'):
    app = Flask(app_name)
    app.config.from_object('bonsaiapi.config.BaseConfig')

    from bonsaiapi.api import api
    app.register_blueprint(api, url_prefix="/api")

    return app
