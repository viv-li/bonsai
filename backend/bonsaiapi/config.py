"""
config.py  
- settings for the flask application object
"""

class BaseConfig(object):  
    DEBUG = True
    # used for encryption and session management
    SECRET_KEY = 'mysecretkey'
    SESSION_PERMANENT = True