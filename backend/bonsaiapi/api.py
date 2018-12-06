"""
api.py
- provides the API endpoints for consuming and producing
  REST requests and responses
"""

from flask import request
from flask_restful import Resource

PF_NO_BRAINER = ["VFINX", "NAESX", "VGTSX", "VBMFX"]
AV_API_URL = "https://www.alphavantage.co/query?apikey=9G4G4R3GA5E5ENSZ&"

store = {'cash_value': 0}


class Cash(Resource):
    def get(self):
        return {'cashValue': store['cash_value']}

    def post(self):
        data = request.get_json()
        transfer_amount = float(data['transferAmount'])

        if store['cash_value'] + transfer_amount < 0:
            return {'cashValue': store['cash_value']}, 400
        else:
            store['cash_value'] += transfer_amount
            print(store['cash_value'])
            return {'cashValue': store['cash_value']}, 200
