"""
api.py
- provides the API endpoints for consuming and producing
  REST requests and responses
"""

from flask import request, session
from flask_restful import Resource

PF_NO_BRAINER = ["VFINX", "NAESX", "VGTSX", "VBMFX"]
AV_API_URL = "https://www.alphavantage.co/query?apikey=9G4G4R3GA5E5ENSZ&"


class Cash(Resource):
    def get(self):
        try:
            cash = session['cash_value']
        except:
            session['cash_value'] = 0
        return {'cashValue': session['cash_value']}

    def post(self):
        data = request.get_json()
        transfer_amount = float(data['transferAmount'])

        try:
            cash = session['cash_value']
        except:
            session['cash_value'] = 0

        if session['cash_value'] + transfer_amount < 0:
            return {'cashValue': session['cash_value']}, 400
        else:
            session['cash_value'] += transfer_amount
            return {'cashValue': session['cash_value']}, 200
